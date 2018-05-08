<template>
    <div class="searcher-container">
        <v-layout row align-center justify-center>
            <router-link to="/">
                <font-awesome-icon :icon="chevronCircleLeft" aria-hidden="true"></font-awesome-icon>
            </router-link>
            <v-flex xs2>
                <v-text-field
                        @keyup="search()"
                        v-model="query"
                        placeholder="Type to search gifs..."
                ></v-text-field>
            </v-flex>
            <font-awesome-icon v-if="loading" :icon="spinner" spin></font-awesome-icon>
        </v-layout>
        <VuePerfectScrollbar ref="scroll" class="scroll-area" :settings="settings"
                             @ps-scroll-y="scrollHandle">
            <div class="result-container">
                <div class="gif" v-if="gifs.length === 0">
                    <h2>No results!</h2>
                </div>
                <v-layout row wrap>
                    <v-flex xs4 v-for="(gif, index) in gifs" :key="index">
                        <v-card>
                            <v-card-media @click="viewGif(index)" :src="gif.images.fixed_height.url" height="200px">
                            </v-card-media>
                        </v-card>
                    </v-flex>
                </v-layout>
            </div>
        </VuePerfectScrollbar>
        <gif-info-popup v-if="gifInfoPopupStatus" :gif="currentGif" @close-dialog="gifInfoPopupStatus = false"></gif-info-popup>
    </div>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
    import chevronCircleLeft from '@fortawesome/fontawesome-free-solid/faChevronCircleLeft';
    import spinner from '@fortawesome/fontawesome-free-solid/faSpinner'
    import GifInfoPopup from './gif-info-popup/gif-info-popup'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';

    export default {
        data() {
            return {
                query: '',
                loading: false,
                page: 1,
                limit: 20,
                offset: 0,
                gifs: [],
                settings: {
                    maxScrollbarLength: 60
                },
                gifInfoPopupStatus: false,
                spinner: spinner,
                chevronCircleLeft: chevronCircleLeft
            }
        },
        components: {
            FontAwesomeIcon,
            VuePerfectScrollbar,
            GifInfoPopup
        },
        name: "gif-searcher",
        methods: {
            viewGif(index) {
                this.gifInfoPopupStatus = true;
                this.currentGif = this.gifs[index];
            },
            scrollHandle(e) {
                if (this.loading)
                    return;
                if (e.srcElement.scrollHeight - e.srcElement.scrollTop < 700) {
                    this.page++;
                    this.offset = this.page * this.limit;
                    this.startSearch();
                }
            },
            search() {
                this.offset = 0;
                this.page = 1;
                if (this.timeout) {
                    clearTimeout(this.timeout);
                }
                this.timeout = setTimeout(() => {
                    this.startSearch();
                }, 1000);
            },
            startSearch() {
                this.loading = true;
                this.axios.get(`https://api.giphy.com/v1/gifs/search?api_key=TWUFTsRt2XQ86wScEYC51LgHraNEygZp&q=${this.query}&limit=${this.limit}&offset=${this.offset}&rating=G&lang=en`)
                    .then((response) => {
                        if (this.page === 1) {
                            this.gifs = response.data.data;
                            this.$refs.scroll.$el.scrollTop = 0;
                        } else {
                            this.gifs.push(...response.data.data);
                        }
                        this.loading = false;
                    });
            }

        }
    }
</script>

<style scoped>
    .router-link-active {
        color: #000;
        margin-right: 15px;
        font-size: 20px;
        margin-top: -5px;
    }

    .fa-spinner {
        font-size: 20px;
        margin-top: -5px;
    }

    .scroll-area {
        position: relative;
        height: 700px;
    }

    .card {
        cursor: pointer;
    }
</style>
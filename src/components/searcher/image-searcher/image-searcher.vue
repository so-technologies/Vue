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
                        placeholder="Type to search images..."
                ></v-text-field>
            </v-flex>
            <font-awesome-icon v-if="loading" :icon="spinner" spin></font-awesome-icon>
        </v-layout>
        <VuePerfectScrollbar ref="scroll" class="scroll-area" :settings="settings"
                             @ps-scroll-y="scrollHandle">
            <div class="result-container">
                <div class="gif" v-if="images.length === 0">
                    <h2>No results!</h2>
                </div>
                <v-layout row wrap>
                    <v-flex xs4 v-for="(image, index) in images" :key="index">
                        <v-card>
                            <v-card-media @click="viewImage(index)" :src="image.thumbnailUrl" height="200px">
                            </v-card-media>
                        </v-card>
                    </v-flex>
                </v-layout>
            </div>
        </VuePerfectScrollbar>
        <image-info-popup v-if="imageInfoPopupStatus" :image="currentImage" @close-dialog="imageInfoPopupStatus = false"></image-info-popup>
    </div>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
    import chevronCircleLeft from '@fortawesome/fontawesome-free-solid/faChevronCircleLeft';
    import spinner from '@fortawesome/fontawesome-free-solid/faSpinner'
    import ImageInfoPopup from './image-info-popup/image-info-popup'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';

    export default {
        data() {
            return {
                query: '',
                loading: false,
                page: 1,
                limit: 20,
                offset: 0,
                images: [],
                settings: {
                    maxScrollbarLength: 60
                },
                imageInfoPopupStatus: false,
                spinner: spinner,
                chevronCircleLeft: chevronCircleLeft
            }
        },
        components: {
            FontAwesomeIcon,
            VuePerfectScrollbar,
            ImageInfoPopup
        },
        name: "image-searcher",
        methods: {
            viewImage(index) {
                this.imageInfoPopupStatus = true;
                this.currentImage = this.images[index];
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
                const headers = {
                    'Ocp-Apim-Subscription-Key' : '7da4da672a644541bb8c7a1566c15272'
                };
                this.axios.get(`https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=${this.query}&offset=${this.offset}&count=${this.limit}`,
                    {headers: headers})
                    .then((response) => {
                        if (this.page === 1) {
                            this.images = response.data.value;
                            this.$refs.scroll.$el.scrollTop = 0;
                        } else {
                            this.images.push(...response.data.value);
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
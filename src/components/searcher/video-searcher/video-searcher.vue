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
                        placeholder="Type to search video..."
                ></v-text-field>
            </v-flex>
            <font-awesome-icon v-if="loading" :icon="spinner" spin></font-awesome-icon>
        </v-layout>
        <VuePerfectScrollbar ref="scroll" class="scroll-area" :settings="settings"
                             @ps-scroll-y="scrollHandle">
            <div class="result-container">
                <div class="gif" v-if="video.length === 0">
                    <h2>No results!</h2>
                </div>
                <v-layout row wrap>
                    <v-flex xs4 v-for="(vid, index) in video" :key="index">
                        <v-card>
                            <v-card-media @click="viewVideo(index)" :src="vid.snippet.thumbnails.medium.url"
                                          height="200px">
                                <font-awesome-icon :icon="youtubeIcon"></font-awesome-icon>
                            </v-card-media>
                        </v-card>
                    </v-flex>
                </v-layout>
            </div>
        </VuePerfectScrollbar>
        <video-info-popup v-if="videoInfoPopupStatus" :video="currentVideo"
                          @close-dialog="videoInfoPopupStatus = false"></video-info-popup>
    </div>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
    import chevronCircleLeft from '@fortawesome/fontawesome-free-solid/faChevronCircleLeft';
    import youtubeIcon from '@fortawesome/fontawesome-free-solid/faPlayCircle';
    import spinner from '@fortawesome/fontawesome-free-solid/faSpinner'
    import VideoInfoPopup from './video-info-popup/video-info-popup'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar';

    export default {
        data() {
            return {
                query: '',
                loading: false,
                page: 1,
                limit: 20,
                offset: 0,
                video: [],
                settings: {
                    maxScrollbarLength: 60
                },
                videoInfoPopupStatus: false,
                spinner: spinner,
                chevronCircleLeft: chevronCircleLeft,
                youtubeIcon: youtubeIcon
            }
        },
        components: {
            FontAwesomeIcon,
            VuePerfectScrollbar,
            VideoInfoPopup
        },
        name: "video-searcher",
        methods: {
            viewVideo(index) {
                this.videoInfoPopupStatus = true;
                this.currentVideo = this.video[index];
            },
            scrollHandle(e) {
                if (this.loading)
                    return;
                if (e.srcElement.scrollHeight - e.srcElement.scrollTop < 700) {
                    this.page++;
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
                let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDbZOGbxkLou0F_LJyKXvFF1quIVBCN4gs&q=${this.query}&maxResults=${this.limit}&type=video`;
                if (this.offset !== 0)
                    url += `&pageToken=${this.offset}`;
                this.axios.get(url)
                    .then((response) => {
                        if (this.page === 1) {
                            this.video = response.data.items;
                            this.$refs.scroll.$el.scrollTop = 0;
                        } else {
                            this.video.push(...response.data.items);
                        }
                        this.loading = false;
                        this.offset = response.data.nextPageToken;
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
    .fa-play-circle {
        font-size: 70px;
        color: #fff;
        margin: auto;
    }
</style>



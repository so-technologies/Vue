<template>
    <v-dialog v-model="dialog" max-width="800">
        <v-container fluid text-xs-center>
            <v-card>
                <v-card-text>
                    <youtube :video-id="video.id.videoId"></youtube>
                    <div class="row">
                        <label>Title</label>
                        <span>{{video.snippet.title}}</span>
                    </div>
                    <div class="row">
                        <label>Description</label>
                        <span>{{video.snippet.description}}</span>
                    </div>
                    <div class="row">
                        <label>Published At</label>
                        <span>{{video.snippet.publishedAt | formatDate}}</span>
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </v-dialog>
</template>

<script>
    export default {
        name: "video-info-popup",
        props: [
            'video'
        ],
        data() {
            return {
                dialog: true
            }
        },
        watch: {
            dialog() {
                this.$emit('close-dialog');
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .row {
        padding: 10px;
    }

    .row label {
        display: block;
        font-weight: bold;
    }
    .container.fluid.text-xs-center {
        padding: 0;
    }
</style>
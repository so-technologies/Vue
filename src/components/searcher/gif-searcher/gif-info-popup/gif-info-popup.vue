<template>
    <v-dialog v-model="dialog" max-width="400">
        <v-container fluid text-xs-center>
            <v-card>
                <v-card-text>
                    <img :src="gif.images.fixed_height.url" alt="">
                    <div class="row">
                        <label>Source URL</label>
                        <a :href="gif.url" target="_blank">{{gif.url}}</a>
                    </div>
                    <div class="row">
                        <label>Content Rating</label>
                        <span>{{gif.rating}}</span>
                    </div>
                    <div class="row">
                        <label>Import Date</label>
                        <span>{{gif.import_datetime}}</span>
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
        name: "gif-info-popup",
        props: [
            'gif'
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
</style>
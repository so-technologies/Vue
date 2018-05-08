<template>
    <v-dialog v-model="dialog" max-width="600">
        <v-container fluid text-xs-center>
            <v-card>
                <v-card-text>
                    <img :src="image.thumbnailUrl" alt="">
                    <div class="row">
                        <label>Source URL</label>
                        <a :href="image.contentUrl" target="_blank">{{image.contentUrl}}</a>
                    </div>
                    <div class="row">
                        <label>Name</label>
                        <span>{{image.name}}</span>
                    </div>
                    <div class="row">
                        <label>Import Date</label>
                        <span>{{image.datePublished | formatDate}}</span>
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
        name: "image-info-popup",
        props: [
            'image'
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
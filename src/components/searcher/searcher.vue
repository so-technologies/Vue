<template>
    <v-content>
        <v-container fluid text-xs-center>

        <h1>
            Welcome to Searcher!
        </h1>
        <div class="navigation">
            <v-btn to="/gifs" color="info">Gifs</v-btn>
            <v-btn to="/video" color="info">Video</v-btn>
            <v-btn to="/images" color="info">Images</v-btn>
        </div>
        <router-view></router-view>
        </v-container>
    </v-content>
</template>

<script>
    import GifSearcher from './gif-searcher/gif-searcher';
    export default {
        name: 'searcher',
        components: {
            GifSearcher
        },
        props: {}
    }
</script>


<style scoped>
    .searcher-container {
        width: 70%;
        margin: 20px auto auto auto;
    }
</style>

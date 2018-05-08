import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from "./routes";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueYouTubeEmbed from 'vue-youtube-embed';

Vue.config.productionTip = false;

Vue.filter('formatDate', (value) => {
    return new Date(value).toDateString();
});

Vue.use(Vuetify);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueYouTubeEmbed);

const router = new VueRouter({
    mode: 'history',
    routes
});

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');

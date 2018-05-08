let routes = [
    {path: '/gifs', component: require('./components/searcher/gif-searcher/gif-searcher').default},
    {path: '/images', component: require('./components/searcher/image-searcher/image-searcher').default},
    {path: '/video', component: require('./components/searcher/video-searcher/video-searcher').default},
    {path: '/', template: ''},
];

export default routes;
export default [{
    path: '/home',
    component: require('./views/Poker.vue'),

}, {
    path: '/about',
    component: require('./views/About.vue'),

},{
    path: '/payout',
    component: require('./views/Payout.vue'),

}, {
    path: '/',
    redirect: '/home',
}, {
    path: '/*',
    redirect: '/home',
}, ];

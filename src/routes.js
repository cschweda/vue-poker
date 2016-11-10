export default [{
    path: '/',
    name: 'Home',
    component: require('./views/Poker.vue'),

}, {
    path: '/about',
    name: 'About',
    component: require('./views/About.vue'),

},{
    path: '/data',
    name: 'Data',
    component: require('./views/Data.vue'),

},

{
  path: '/*', redirect: '/'
}];

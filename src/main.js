import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import VueLazyLoad from 'vue-lazyload';
import fastclick from 'fastclick';
import 'common/stylus/index.styl';

Vue.config.productionTip = false;

fastclick.attach(document.body);

Vue.use(VueLazyLoad, {
  error: require('common/image/error.jpg'),
  loading: require('common/image/default.png'),
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

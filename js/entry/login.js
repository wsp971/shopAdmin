import Vue from 'vue';
import login from '../components/login';
import appPlagin from '../utils';

Vue.use(appPlagin);

new Vue({
  render: h => h(login),
}).$mount('#app');

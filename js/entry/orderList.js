import Vue from 'vue';
import App from '../components/order';
import appPlagin from '../utils';

Vue.use(appPlagin);

new Vue({
  render: h => h(App),
}).$mount('#app');

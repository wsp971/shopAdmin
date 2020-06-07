import Vue from 'vue';
// import iView from 'iview';
import 'iview/dist/styles/iview.css';
import login from '../components/login';
import appPlagin from '../utils/';
Vue.use(appPlagin);
// Vue.use (iView);

new Vue({
    render: h => h(login)
}).$mount('#app');

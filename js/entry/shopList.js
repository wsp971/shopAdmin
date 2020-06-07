import Vue from 'vue';
import 'iview/dist/styles/iview.css';
import App from '../components/app';
import appPlagin from '../utils/';
import { Button } from 'iview';
Vue.component('Button', Button);
Vue.use(appPlagin);

new Vue({
    render: h => h(App)
}).$mount('#app');

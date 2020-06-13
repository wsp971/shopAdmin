import Vue from 'vue';
import App from '../components/addDishes';
import appPlagin from '../utils';

Vue.use(appPlagin);

const dishTypeMap = {
  1: '甜品蛋糕',
  2: '火锅',
  3: '自助餐',
  4: '小吃快餐',
  5: '日韩料理',
  6: '川香菜',
  7: '东北菜',
  8: '西北菜',
  9: '面食',
  10: '汤/粥',
};

const bus = new Vue();

Vue.prototype.$dishTypeMap = dishTypeMap;
Vue.prototype.$bus = bus;

new Vue({
  render: h => h(App),
}).$mount('#app');

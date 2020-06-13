import config from '@config';
import url from './url';
import * as ajax from './ajax';
import cookie from './cookie';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

const { baseUrl } = config;
function linkPage(pageurl) {
  location.href = baseUrl + pageurl;
}

// eslint-disable-next-line no-extend-native
Array.prototype.average = average;

function average() {
  let sum = 0;
  this.forEach(item => { sum = item + sum; });
  return parseFloat(sum / this.length).toFixed(1);
}

export default {
  install(Vue) {
    Vue.prototype.$ajax = ajax;
    Vue.prototype.$url = url;
    Vue.prototype.$cookie = cookie;
    Vue.prototype.$linkPage = linkPage;
    Vue.prototype.$average = average;
    Vue.use(ViewUI);
  },
};

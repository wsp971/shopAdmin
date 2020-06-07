import * as url from './url';
import * as ajax from './ajax';
import cookie from './cookie';
import { Message } from 'iview';

let baseUrl = '/shopAdmin';
if (url.getUrlParam('debug') == 1) {
    baseUrl = '';
}

function linkPage (pageurl) {
    location.href = baseUrl + pageurl + (url.getUrlParam('debug') == 1 ? (pageurl.indexOf('?') > -1 ? '&debug=1' : '?debug=1') : '');
}

const average = function () {
    let sum = 0;
    this.forEach(item => { sum = item + sum });
    return parseFloat(sum / this.length).toFixed(1);
};

export default {
    install (Vue) {
        Vue.prototype.$ajax = ajax;
        Vue.prototype.$url = url;
        Vue.prototype.$cookie = cookie;
        Vue.prototype.$linkPage = linkPage;
        Vue.prototype.$Message = Message;
        Vue.prototype.$average = average;
    }
};


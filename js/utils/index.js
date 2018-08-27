import * as url from './url';
import * as ajax from './ajax';
import {Message} from 'iview';

let baseUrl = '/shopAdmin';
if(url.getUrlParam('debug') == 1){
	baseUrl = '';
}

function linkPage(pageurl){
	location.href = baseUrl + pageurl + (url.getUrlParam('debug')==1? (pageurl.indexOf('?')> -1? '&debug=1':'?debug=1') :'');
};

export default {
	install: function(Vue){
		Vue.prototype.$ajax = ajax;
		Vue.prototype.$url = url;
		Vue.prototype.$linkPage = linkPage;
		Vue.prototype.$Message = Message;
	}
};



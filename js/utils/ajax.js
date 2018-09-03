import axios from 'axios';
const TIMEOUT = 8000;
const host = 'localhost:9999';
import {getUrlParam} from "./url";

if(getUrlParam('debug')==1){
	axios.defaults.baseURL = '//localhost:9999';
}else{
	axios.defaults.baseURL = '//aoshiman.com.cn/shopServer';
}

exports.get = function(obj){
	return axios({
		method: 'get',
		url: obj.url,
		timeout: TIMEOUT,
		params: obj.data,
		withCredentials: true
	});
};


exports.post = function(obj){
	return axios({
		method:'post',
		url:obj.url,
		timeout: TIMEOUT,
		data:obj.data,
		withCredentials: true
		
	})
}
import axios from 'axios';
import config from '@config';

const TIMEOUT = 8000;
const { ajaxBaseUrl } = config;
axios.defaults.baseURL = ajaxBaseUrl;

export function get(obj) {
  return axios({
    method: 'get',
    url: obj.url,
    timeout: TIMEOUT,
    params: obj.data,
    withCredentials: true,
  });
}

export function post(obj) {
  return axios({
    method: 'post',
    url: obj.url,
    timeout: TIMEOUT,
    data: obj.data,
    withCredentials: true,
  });
}

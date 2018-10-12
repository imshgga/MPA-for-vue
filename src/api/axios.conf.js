import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(function (config) {
  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  } else {
    config.params = config.params || {}
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (res) {
  let {resultCode,resultMsg,resultData} = res.data;

  return resultData;
}, function (error) {
  // Do something with response error
  // Toast("出错了！");
  console.error("error===",error);
  return Promise.reject(error)
})

// 让ajax请求头携带cookie
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
export default axios

import axios from 'axios';
// import UserApi from './user'

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'If-Modified-Since': 0,
    'Cache-Control': 'no-cache'
  }
});

// // 添加一个请求拦截器
// instance.interceptors.request.use(function (config) {
//   // Do something before request is sent
//   return config;
// }, function (error) {
//   // Do something with request error
//   return Promise.reject(error);
// });
//
// // 添加一个响应拦截器
// instance.interceptors.response.use(res => res, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

// 各种状态码处理
const handleResStatus = (status, msg, url) => {
  switch (status) {
    case 500:
      console.log('服务500：', msg);
      alert('服务器错误500：请截图给管理员，以便快捷修复错误！  \nurl:' + url + '\n错误信息：' + msg);
      break;
    default:
      break;
  }
};

// 将请求数据的方式包装成一个对象
let api = {};
let likeGet = ['delete', 'get', 'head', 'options'];
let likePost = ['post', 'put', 'patch'];

api.request = function () {
  let isPost = arguments[0];
  let method = arguments[1];
  let url = arguments[2];
  let data = arguments[3];
  let config = {
    method,
    url,
    responseType: 'json'
  };

  config[isPost ? 'data' : 'params'] = data;

  return new Promise(function (resolve, reject) {
    instance
      .request(config)
      .then(res => {
        const data = res.data;
        if (!data) {
          reject(false);
        } else if (data.status !== 200) {
          handleResStatus(data.status, data.msg, res.config.url);
          reject(data || {});
        } else {
          resolve(data);
        }
      })
      .catch(err => {
        reject((err.response || {}).data);
      });
  });
};

likeGet.forEach(method => {
  api[method] = function () {
    return api.request(false, method, ...arguments);
  };
});

likePost.forEach(method => {
  api[method] = function () {
    return api.request(true, method, ...arguments);
  };
});


api['api'] = {
  // [UserApi.name]: UserApi.api(api)
};

export default api;

import axios from 'axios'
//创建axios的一个实例

const instance = axios.create({
    baseURL: 'http://localhost:8888',
    timeout: 6000,
    withCredentials: true,
    headers: {"content-type": "application/x-www-form-urlencoded"}
})

instance.interceptors.request.use(config => {
    config.headers.token = window.localStorage.getItem('token');
    config.headers['Content-Type'] =  'application/json;charset=UTF-8';
    if (config.method === 'get') {
        config.paramsSerializer = function(params) {
          return qs.stringify(params, { arrayFormat: 'repeat' })
        }
      }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    console.log('拦截器报错');
    return Promise.reject(error);
});
/**
 * 使用es6的export default导出了一个函数，导出的函数代替axios去帮我们请求数据，
 * 函数的参数及返回值如下：
 * @param {String} method  请求的方法：get、post、delete、put
 * @param {String} url     请求的url:
 * @param {Object} data    请求的参数
 * @returns {Promise}     返回一个promise对象，其实就相当于axios请求数据的返回值
 */
export default function (method, url, data = null) {
    method = method.toLowerCase();
    if (method === 'post') {
        return instance.post(url, data)
    } else if (method === 'get') {
        return instance.get(url, { params: data })
    } else if (method === 'delete') {
        return instance.delete(url, { params: data})
    }else if(method === 'put'){
        return instance.put(url,data)
    }else{
        console.error('未知的method'+method)
        return false
    }
}

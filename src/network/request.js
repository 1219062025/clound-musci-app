import axios from 'axios';
export function request(config) {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 5000,
    withCredentials: true // 允许跨域设置，不然可能因为拿不到cookie而报错
  })
  /*请求拦截*/
  axiosInstance.interceptors.request.use(
    config => {
      if (config.meth === 'post' && !(config.data instanceof FormData)) {
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
        // config.data = qs.stringify(config.data, { arrayFormat: 'repeat' }) /*这里是，后端要求传数组的时候做的设置，以前出过错*/
      }
      return config
    }, error => {
      return Promise.reject(error)
    }
  )
  /* 响应拦截 */
  axiosInstance.interceptors.response.use(
    res => {
      /*可在这里根据返回的状态码做一些拦截操作*/
      return res
    }, err => {
      return Promise.resolve(err)
    }
  )

  return axiosInstance(config)
}
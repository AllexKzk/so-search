import axios from 'axios'

const http = axios.create({
  baseURL: 'https://api.stackexchange.com/2.3/',
})

http.interceptors.request.use(config => {
  /* add default api query params */
  const apiKey = ''
  const site = 'stackoverflow'

  const hasQueryParams = config.url?.indexOf('?') !== -1
  config.url += `${hasQueryParams ? '&' : '?'}key=${apiKey}&site=${site}`
  return config
})

export default http

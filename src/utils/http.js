
import axios from 'axios'
import queryString from 'queryString'
var HTTP = axios.create({
    baseURL: '/',
    timeout: 3000,
    responseType:'json',
    withCredentials: true,
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  })

export default HTTP

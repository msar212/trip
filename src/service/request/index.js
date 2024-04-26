import axios from 'axios'
import { BASE_URL, TIMEOUT } from './config'

class DDFRequest{
  constructor(baseURL,timeout){
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: timeout
    })
  }

  request(config){
    return new Promise((resolve,reject)=>{
      this.instance.request(config).then(res=>{
        resolve(res.data)
      }).catch(err=>{
        reject(err)
      })
    })
  }

  get(url,params){
    return this.request({
      method: 'get',
      url: url,
      params: params
    })
  }

  post(url,data){
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default new DDFRequest(BASE_URL, TIMEOUT)
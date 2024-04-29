import axios from 'axios'

import { BASE_URL, TIMEOUT } from '@/service/request/config'

import useMainStore from '@/stores/modules/main'

const mainStore = useMainStore()

class DDFRequest{
  constructor(baseURL, timeout){
    this.instance = axios.create({
      baseURL: baseURL,
      timeout: timeout
    })

    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      return config
    }, err => {
      return err
    })
    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false
      return res
    }, err => {
      mainStore.isLoading = false
      return err
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

  get(url, params = {}){
    return this.request({
      method: 'get',
      url: url,
      params: params
    })
  }

  post(url, data = {}){
    return this.request({
      method: 'post',
      url: url,
      data: data
    })
  }
}

export default new DDFRequest(BASE_URL, TIMEOUT)
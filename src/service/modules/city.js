import DDFRequest from '@/service/request'

export function getCityList(){
  return DDFRequest.get('/city/all',"")
}
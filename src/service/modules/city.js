import DDFRequest from '../request'

export function getCityList(){
  return DDFRequest.get('/city/all',"")
}
import DDFRequest from '@/service/request'

export function getDetailInfos(houseId){
  return DDFRequest.get('/detail/infos', {
    houseId,
  })
}
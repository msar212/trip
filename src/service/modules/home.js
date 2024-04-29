import DDFRequest from '@/service/request'

export function getHotSuggests(){
  return DDFRequest.get('/home/hotSuggests')
}

export function getCategories(){
  return DDFRequest.get('/home/categories')
}

export function getHouselist(currentPage){
  return DDFRequest.get('/home/houselist', {
    page: currentPage,
  })
}
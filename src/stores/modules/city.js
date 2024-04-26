import {defineStore} from 'pinia'

import { getCityList } from '@/service/index'

const useCityStore = defineStore("city",{
    state: () => ({
        cityList: {}
    }),
    actions: {
        async fetchCityList(){
            const res = await getCityList()
            this.cityList = res.data
        }
    }
})

export default useCityStore
import { defineStore } from "pinia"

import { getHotSuggests, getCategories, getHouselist } from '@/service/index'

export default defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 1,
    houselist: []
  }),
  actions: {
    fetchHotSuggests() {
      getHotSuggests().then(res => {
        this.hotSuggests = res.data
      })
    },
    fetchCategoriesData() {
      getCategories().then(res => {
        this.categories = res.data
      })
    },
    async fetchHouselistData() {
      const res = await getHouselist(this.currentPage)
      this.houselist.push(...res.data)
      this.currentPage++
    }
  }
})
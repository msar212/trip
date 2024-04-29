<script setup>
import { ref, watch, computed } from 'vue';

import { getAssertUrl } from '@/utils/load_asserts';

import useHomeStore from '@/stores/modules/home';

import HomeNavBar from './cpns/home-nav-bar.vue';
import SearchBox from './cpns/search-box.vue';
import HomeCategories from './cpns/home-categories.vue';
import HomeContent from './cpns/home-content.vue';

import useScroll from '@/hooks/useScroll'

let homeStore = useHomeStore();
homeStore.fetchHotSuggests();
homeStore.fetchCategoriesData();
homeStore.fetchHouselistData();

// 监听滚动到底部
const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchHouselistData().then(() => {
      isReachBottom.value = false
    })
  }
})

// 定义的可响应式数据, 依赖另外一个可响应式的数据, 那么可以使用计算函数(computed)
const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360
})
</script>

<template>
  <div class="home">
    <HomeNavBar></HomeNavBar>

    <div class="banner">
      <img :src="getAssertUrl('home/banner.webp')">
    </div>

    <SearchBox/>
    <HomeCategories/>

    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar :start-date="'09.19'" :end-date="'09.20'"/>
    </div>

    <HomeContent/>
  </div>
</template>

<style lang="less" scoped>
.home {
  padding-bottom: 50px;
  overflow-y: auto;
  
  .banner img {
    width: 100%;
  }

  .search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
  }
}
</style>
<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from "vue-router";

import HouseItemV9 from "@/components/house-item-v9/house-item-v9.vue"
import HouseItemV3 from "@/components/house-item-v3/house-item-v3.vue"
import useHomeStore from '@/stores/modules/home';

const homeStore = useHomeStore()
const { houselist } = storeToRefs(homeStore)

const router = useRouter()
const itemClick = (item) => {
  // 跳转到Detail页面
  router.push("/detail/" + item.houseId)
}
</script>

<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <div class="feeds_col_left">
        <template v-for="(item, index) in houselist" :key="item.data.houseId">
          <template v-if="index % 2 !== 0">
            <house-item-v9 
              v-if="item.discoveryContentType === 9" 
              :item-data="item.data"
              @click="itemClick(item.data)"
            />
            <house-item-v3 
              v-else-if="item.discoveryContentType === 3" 
              :item-data="item.data"
              @click="itemClick(item.data)"
            />
          </template>
      </template>
      </div>
      <div class="feeds_col_right">
        <template v-for="(item, index) in houselist" :key="item.data.houseId">
          <template v-if="index % 2 == 0">
            <house-item-v9 
              v-if="item.discoveryContentType === 9" 
              :item-data="item.data"
              @click="itemClick(item.data)"
            />
            <house-item-v3 
              v-else-if="item.discoveryContentType === 3" 
              :item-data="item.data"
              @click="itemClick(item.data)"
            />
          </template>
        </template>
      </div>
      
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    .feeds_col_left, .feeds_col_right {
      width: 50%;
    }
  }
}
</style>
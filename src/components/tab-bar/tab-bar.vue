<script setup>
  import { ref } from 'vue'
  import tabbarData from '@/assets/data/tabbar'
  import { getAssertUrl } from "@/utils/load_asserts"

  let currentIndex = ref(0)
</script>

<template>
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9645">
      <van-tabbar-item v-for="(item, index) in tabbarData" :to="item.path" >
        {{ item.text }}
        <template #icon>
          <img v-if="currentIndex === index" :src="getAssertUrl(item.imageActive)" alt="">
          <img v-else :src="getAssertUrl(item.image)" alt="">
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="less" scoped>
  .tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;

    --van-tabbar-item-font-size: 14px;

    img {
      height: 30px;
    }
  }
</style>
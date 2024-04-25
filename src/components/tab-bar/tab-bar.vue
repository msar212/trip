<script setup>
  import { ref } from 'vue'
  import tabbarData from '@/assets/data/tabbar'
  import { getAssertUrl } from "@/utils/load_asserts"

  let currentIndex = ref(0)
</script>

<template>
  <div class="tab-bar">
    <template v-for="(item, index) in tabbarData">
      <router-link
       :to="item.path"
       :class="{'active': currentIndex === index}"
        @click="currentIndex = index"
      >
        <img v-if="currentIndex === index" :src="getAssertUrl(item.imageActive)" alt="">
        <img v-else :src="getAssertUrl(item.image)" alt="">
        <span>{{item.text}}</span>
      </router-link>
    </template>
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

    &>a {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &.active {
        color: var(--primary-color);
      }
      
      img {
        width: 34px;
        height: 34px;
      }
    }
  }
</style>
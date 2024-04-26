<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { getAssertUrl } from '@/utils/load_asserts.js';
  import HomeNavBar from './cpns/home-nav-bar.vue';
  import SearchBox from './cpns/search-box.vue';

  let router = useRouter();

  const currentPosition = () => {
    router.push('/city');
  }

</script>

<template>
  <div class="home">
    <HomeNavBar></HomeNavBar>
    <div class="banner">
      <img :src="getAssertUrl('home/banner.webp')">
    </div>
    <div class="location">
      <div class="city">杭州</div>
      <div class="current" @click="currentPosition">
        <span>我的位置</span>
        <img :src="getAssertUrl('home/icon_location.png')" alt="">
      </div>
    </div>
    <SearchBox/>
  </div>
</template>

<style lang="less" scoped>
  .home {
    .banner img {
      width: 100%;
    }

    .location {
      display: flex;
      align-items: center;
      padding: 10px 20px;

      .city {
        flex: 1;
        color: #333;
        font-size: 15px;
      }

      .current {
        display: flex;
        align-items: center;

        span {
          position: relative;
          margin-top: 1px;
          margin-right: 8px;
          color: #666;
          font-size: 12px;
        }

        img {
          vertical-align: middle;
          width: 18px;
          height: 18px;
        }
      }
    }
  }
</style>
<script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';

  import { getCityList } from '@/service/index'

  let searchValue = ref('');

  let router = useRouter();
  const cancelClick = () => {
    router.back();
  }

  getCityList().then(res => {
    console.log(res);
  })
</script>

<template>
  <div class="city top-page">
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      name="keyword"
      shape="round"
      show-action
      @cancel="cancelClick"
    />
    <van-tabs v-model:active="active" color="#f9854">
      <van-tab title="国内/港澳台">内容 1</van-tab>
      <van-tab title="海外">内容 2</van-tab>
    </van-tabs>

  </div>
</template>

<style lang="less" scoped>

</style>
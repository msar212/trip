<script setup>
  import { computed, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';

  import useCityStore from '@/stores/modules/city'

  let searchValue = ref('');
  let tabActive = ref('');

  let router = useRouter();
  const cancelClick = () => {
    router.back();
  }

  let cityStore = useCityStore();
  cityStore.fetchCityList();
  let { cityList } = storeToRefs(cityStore);
  
  let currentGroup = computed(()=>cityList.value[tabActive.value])
</script>

<template>
  <div class="city top-page">
      <div class="top">
        <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        name="keyword"
        shape="round"
        show-action
        @cancel="cancelClick"
      />
      <van-tabs v-model:active="tabActive" color="#f9854">
        <template v-for="(value,key,index) in cityList" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>

    <div class="content">
      {{currentGroup}}
    </div>
  </div>
</template>

<style lang="less" scoped>
  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
</style>
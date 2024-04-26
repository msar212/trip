<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

defineProps({
  currentGroup: {
    type: Object,
    required: true,
    default: () => ({})
  }
})
</script>

<template>
  <van-index-bar :sticky="false">
    <template v-for="item in currentGroup.cities">
      <van-index-anchor :index="item.group" />
      <template v-for="item in item.cities">
        <van-cell :title="item.cityName" />
      </template>
    </template>
  </van-index-bar>
</template>

<style lang="less" scoped>
:deep(.van-index-bar__index) {
  font-weight: 500 !important;
}
</style>
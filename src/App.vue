<script setup>
  import TabBar from '@/components/tab-bar/tab-bar.vue'
  import Loading from "@/components/loading/loading.vue"
</script>

<template>
  <router-view></router-view>
  <TabBar/>
  <loading/>
</template>

<style scoped>

</style>

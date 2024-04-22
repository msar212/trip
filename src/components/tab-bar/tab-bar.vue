<script>
  export default {
    
  }
</script>

<template>
  <div class="tab-bar">
    <router-link to="/home">
      <img src="@/assets/img/tabbar/tab_home.png" alt="">
      <span>首页</span>
    </router-link>
    <router-link to="/favor">
      <img src="@/assets/img/tabbar/tab_favor.png" alt="">
      <span>收藏</span>
    </router-link>
    <router-link to="/order">
      <img src="@/assets/img/tabbar/tab_order.png" alt="">
      <span>订单</span>
    </router-link>
    <router-link to="/message">
      <img src="@/assets/img/tabbar/tab_message.png" alt="">
      <span>消息</span>
    </router-link>
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
      
      img {
        width: 34px;
        height: 34px;
      }
    }
  }
</style>
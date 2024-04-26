<template>
  <div class="serach-box">
    <div class="date-range">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time"> 8月25日 </span>
        </div>
      </div>
      <div class="stay">共一晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time"> 8月26日 </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.date-range {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  color: #999;

  .start {
    min-width: 30%;
  }
  
  .stay {
    flex: 1;
    font-size: 12px;
    color: #666;
    text-align: center;
  }

  .end {
    min-width: 30%;
  }

  .date {
    display: flex;
    flex-direction: column;
    align-items: center;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 5px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
</style>
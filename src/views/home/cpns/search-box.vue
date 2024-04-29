<script setup>
  import { ref, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';

  import useHomeStore from '@/stores/modules/home';
  import useMainStore from '@/stores/modules/main';

  import { formatMonthDay, nextDay, getDiffDays} from '@/utils/form_data';
  import { getAssertUrl } from '@/utils/load_asserts';

  let router = useRouter();
  const cityClick = () => {
    router.push('/city');
  }

  const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
      console.log("获取位置成功:", res)
    }, err => {
      console.log("获取位置失败:", err)
    }, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  }

  // const cityStore = useCityStore()
  const currentCity = ref("杭州")

  // 日期范围的处理
  const mainStore = useMainStore()
  const { startDate, endDate } = storeToRefs(mainStore)
  const startDateStr = computed(() => formatMonthDay(startDate.value))
  const endDateStr = computed(() => formatMonthDay(endDate.value))
  const stayCount = ref(getDiffDays(startDate.value, endDate.value))

  let showCalendar = ref(false);
  let onConfirm = (value) => {
    // 1.设置日期
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    mainStore.startDate = selectStartDate
    mainStore.endDate = selectEndDate
    // 2.计算天数
    stayCount.value = getDiffDays(selectStartDate, selectEndDate)
    // 3.关闭日历
    showCalendar.value = false;
  }

  let homeStore = useHomeStore();
  let { hotSuggests } = storeToRefs(homeStore);

  let searchBtnClick = () => {
    router.push({
      path: "/search",
      query: {
        startDate: startDate.value,
        endDate: endDate.value,
        currentCity: currentCity.value.cityName
      }
    });
  }
</script>

<template>
  <div class="serach-box">
    <div class="location">
      <div class="city" @click="cityClick">杭州</div>
      <div class="current" @click="positionClick">
        <span>我的位置</span>
        <img :src="getAssertUrl('home/icon_location.png')" alt="">
      </div>
    </div>

    <!-- #region入住时间选择 start -->
    <div class="date-range" @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{startDateStr}}</span>
        </div>
      </div>
      <div class="stay">共{{stayCount}}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{endDateStr}}</span>
        </div>
      </div>
    </div>
    <!-- #endregion 入住时间选择 end -->

    <van-calendar
      color="#ff9854"
      type="range"
      :show-confirm="false"
      v-model:show="showCalendar"
      @confirm="onConfirm"
    />

    <div class="item price-counter">
      <div class="start">价格不限</div>
      <div class="middle"></div>
      <div class="end">人数不限</div>
    </div>
    <div class="item keyword">关键字/位置/民宿名</div>
    <div class="hot-suggest">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <span class="tag">{{ item.tagText.text }}</span>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
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


.item {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;
  color: #999;
}

/* #region 入住时间选择 start */
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
/* #endregion 入住时间选择 end */

/* #region 价格与人数 start */
.price-counter {
  .middle {
    flex: 1;
  }

  .start, .end {
    min-width: 30%;
    text-align: center;
  }
}
/* #endregion 价格与人数 end */

/* #region 热门关键字 start */
.keyword {
  color: #333;
}

.hot-suggest {
  margin: 0 0 10px 0;
  padding: 0 20px;

  .tag {
    display: inline-block;
    font-size: 12px;
    padding: 4px 8px;
    margin: 3px;
    border-radius: 14px;
    color: #3f4954;
    background-color: #f1f3f5;
  }
}
/* #endregion 热门关键字 end */

/* #region 搜索按钮 start */
.search-btn {
  display: flex;
  padding: 0 20px;

  .btn {
    flex: 1;
    height: 38px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}
/* #endregion 搜索按钮 end */
</style>
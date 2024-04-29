<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getDetailInfos } from "@/service"

import TabControl from "@/components/tab-control/tab-control.vue"
import DetailSwipe from "./cpns/detail_01-swipe.vue"
import DetailInfos from "./cpns/detail_02-infos.vue"
import DetailFacility from "./cpns/detail_03-facility.vue"
import DetailLandlord from "./cpns/detail_04-landlord.vue"
import DetailComment from "./cpns/detail_05-comment.vue"
import DetailNotice from "./cpns/detail_06-notice.vue"
// import DetailMap from "./cpns/detail_07-map.vue"
import DetailIntro from "./cpns/detail_08-intro.vue"
import useScroll from '@/hooks/useScroll'

const router = useRouter()
const route = useRoute()
const houseId = route.params.id
// 监听返回按钮的点击
const onClickLeft = () => {
  router.back()
}

// 发送网络请求，获取房屋详细信息
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data
})

// tabControl 相关的操作
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})


const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  const values = Object.values(sectionEls.value)
  let index = values.length - 1
  for (let i = 0; i < values.length; i++) {
    const el = values[i]
    let instance = el.offsetTop
    if (instance > newValue + 44) {
      console.log(i, instance, newValue + 44)
      index = i - 1
      break
    }
  }
  if (!isClick) {
    tabControlRef.value?.setCurrentIndex(index)
  } else if (currentDistance === newValue) {
    isClick = false
  }
})

// const landlordRef = ref()
// const sectionEls = []
// const getSectionRef = (value) => {
//   sectionEls.push(value.$el)
// }
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)
})
const getSectionRef = (value) => {
  if (!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}

let currentDistance = -1
let isClick = false
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop
  if (index !== 0) {
    instance = instance - 44
  }

  isClick = true
  currentDistance = instance

  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth"
  })
}
</script>

<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      v-if="showTabControl"
      class="tabs"
      :titles="names"
      @tabItemClick="tabClick"
      ref="tabControlRef"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"/>
      <detail-infos name="描述" :ref="getSectionRef" :top-infos="mainPart.topModule"/>
      <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <!-- <detail-map name="周边" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"/> -->
      <detail-intro :price-intro="mainPart.introductionModule"/>
    </div>
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="">
      <div class="text">无界途旅, 永无止境!</div>
    </div>

  </div>
</template>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>

<template>
    <div class="detail hidetabbar" ref="detailRef">
        <tab-control class="tabs" v-if="showTabControl" :titles="['描述', '设施', '房东', '评论', '须知', '地图']"
            @itemClick="tabClick" />
        <van-nav-bar title="房屋详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="mainPart" v-memo="[mainPart]">
            <detail-swipe :swipe-data="mainPart?.topModule.housePicture.housePics"></detail-swipe>
            <detail-infos :ref="getSectionRef" :top-infos="mainPart.topModule"></detail-infos>
            <detail-facility :ref="getSectionRef"
                :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
            <detail-landord :ref="getSectionRef" name="房东"
                :landlord="mainPart.dynamicModule.landlordModule"></detail-landord>
            <detail-comment :ref="getSectionRef" name="评论" :comment="mainPart.dynamicModule.commentModule" />
            <detail-notice :ref="getSectionRef" name="须知" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
            <detail-map :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"></detail-map>
            <DetilInfo :price-intro="mainPart.introductionModule"></DetilInfo>
        </div>
        <div class="footer">
            <img src="@/assets/img/detail/icon_ensure.png" alt="">
            <div class="text">探寻自己的旅途</div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { getDetailInfo } from '@/service/index'
import useScroll from '@/hooks/useScroll'
import TabControl from '@/components/tab-control/tab-control.vue'
import DetailSwipe from './cpns/detail-01-swipe.vue'
import DetailInfos from './cpns/detail-02-infos.vue';
import DetailFacility from './cpns/detail-03-facility.vue';
import DetailLandord from './cpns/detail-04-landord.vue';
import DetailComment from './cpns/detail-05-comment.vue';
import DetailNotice from './cpns/detail-06-notice.vue';
import DetailMap from './cpns/detail-07-map.vue';
import DetilInfo from './cpns/detail-08-intro.vue';

const router = useRouter()
const route = useRoute();
const houseId = route.params.id

// 这里采用在组件中发送网络请求
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfo(houseId).then(res => {
    detailInfos.value = res.data;
})

const sectionEls = [];
// ref绑定函数，每次绑定就会执行函数
const getSectionRef = (value) => {
    console.log("----");
    sectionEls.push(value?.$el)
    // console.log(value.$el);
    // const name = value.$el.getAttribute("name")
    // sectionEls.value[name] = value.$el
}

// 监听返回按钮的点击
const onClickLeft = () => {
    router.back();
}
// tabControl相关的操作,showTabControl写成计算属性
const detailRef = ref();
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
    return scrollTop.value >= 300;
});
const tabClick = (index) => {
    console.log("detailRef", detailRef.value.scrollTo);
    let instance = sectionEls[index].offsetTop;
    if (index != 0) {
        instance = instance - 44;
    }
    detailRef.value.scrollTo({
        top: instance,
        behavior: 'smooth',//平滑滚动
    })
}

</script>
<style lang="less" scoped>
.tabs {
    position: fixed;
    background-color: #fff;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
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
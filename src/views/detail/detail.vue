<template>
    <div class="detail hidetabbar">
        <van-nav-bar title="房屋详情" left-text="返回" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="mainPart">
            <detail-swipe :swipe-data="mainPart?.topModule.housePicture.housePics"></detail-swipe>
            <detail-infos :top-infos="mainPart.topModule"></detail-infos>
            <div class="facility">
                <detail-section>
                    
                </detail-section>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { getDetailInfo } from '@/service/index'

import DetailSection from '@/components/detail-section/detail-section.vue'
import DetailSwipe from './cpns/detail-01-swipe.vue'
import DetailInfos from './cpns/detail-02-infos.vue';
const router = useRouter()
const route = useRoute();
const houseId = route.params.id

// 这里采用在组件中发送网络请求
const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfo(houseId).then(res => {
    detailInfos.value = res.data;
})




// 监听返回按钮的点击
const onClickLeft = () => {
    router.back();
}
</script>
<style lang="less" scoped></style>
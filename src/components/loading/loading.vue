<template>
    <div class="loading" @click="loadClick" v-show="mianStore.isLoading">
        <div class="bg" >
            <img src="@/assets/img/home/full-screen-loading.gif" alt="">
        </div>
    </div>
</template>
<script setup>
import useMianStore from '@/store/modules/main'
const mianStore = useMianStore();
const loadClick = () => {
    mianStore.isLoading = false;
}
</script>
<style lang="less" scoped>
.loading {
    position: fixed;
    z-index: 9;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .1);

    .bg {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 104px;
        height: 104px;
        background: url(@/assets/img/home/loading-bg.png) 0 0 / 100% 100%;

        img {
            width: 70px;
            height: 70px;
            margin-bottom: 10px;
        }
    }
}
</style>
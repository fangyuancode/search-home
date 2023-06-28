<template>
    <div class="home">
        <home-nav-bar></home-nav-bar>
        <home-banner></home-banner>
        <home-search-box></home-search-box>
        <home-categories></home-categories>
        <div class="search-bar" v-if="isShowBar">
            <search-bar></search-bar>
        </div>
        <home-content></home-content>

    </div>
</template>
<script setup>
import { watch, computed } from 'vue'
import useHomeStore from '@/store/modules/home'
import homeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import homeBanner from './cpns/home-banner.vue';
import homeCategories from './cpns/home-categories.vue';
import homeContent from './cpns/home-content.vue';
import searchBar from '@/components/search-bar/search-bar.vue';
import useScroll from '@/hooks/useScroll'

const homeStore = useHomeStore();
homeStore.fetchHotSuggestData();
homeStore.fetchCategoriesData();
homeStore.fetchHouselistData();

// 方法一：传入一个回调函数
// useScroll(() => {
//     homeStore.fetchHouselistData();
// })
// 方法二：监控变量的状态
const { isReachBottom, scrollTop } = useScroll()
// 使用watch监听isReachBottom的改变
// 当原来的值，从false变成true的时候，说明已经到达底部了。
watch(isReachBottom, (newValue) => {
    if (newValue) {
        homeStore.fetchHouselistData().then(() => {
            isReachBottom.value = false;
        })
    }
}, { deep: true })

// 搜索框显示的控制
// const isShowBar = ref(false);
// watch(scrollTop, (newValue) => {
//     if (newValue) {
//         isShowBar.value = newValue > 100
//     }
// })

// 直接使用计算属性，大于等于100为true
// 计算属性，依赖于响应式的数据，数据一旦发生变化，就会重新计算。
const isShowBar = computed(() => {
    return scrollTop.value >= 350
})







</script>
<style lang="less" scoped>
.search-bar {
    z-index: 9;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}
</style>
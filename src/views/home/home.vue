<template>
    <div class="home">
        <home-nav-bar></home-nav-bar>
        <div class="banner">
            <!-- <img src="@/assets/img/home/banner.webp" alt=""> -->
            <van-swipe :autoplay="3000" lazy-render>
                <van-swipe-item v-for="image in images" :key="image">
                    <img :src="getAssetsURL(image)" />
                </van-swipe-item>
            </van-swipe>

        </div>
        <home-search-box></home-search-box>
    </div>
</template>
<script setup>
import homeNavBar from './cpns/home-nav-bar.vue';
import homeSearchBox from './cpns/home-search-box.vue';
import { getAssetsURL } from '@/utils/load_assets'

const images = ["home/banner1.jpg", "home/banner2.jpg", "home/banner.webp"];


</script>
<style lang="less" scoped>
.home {
    .banner {
        img {
            width: 100%;
        }
    }


}
</style>
<template>
    <div class="banner">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in images" :key="image">
                <img :src="getAssetsURL(image)" />
            </van-swipe-item>
        </van-swipe>
    </div>
</template>
<script setup>
import { getAssetsURL } from '@/utils/load_assets'

const images = ["home/banner1.jpg", "home/banner2.jpg", "home/banner.webp"];


</script>
<style lang="less" scoped>
.banner {
    img {
        width: 100%;
    }
}
</style>
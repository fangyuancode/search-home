<template>
    <div class="search-box">
        <div class="location">
            <div class="city" @click="cityClick">广州</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
// 获取城市的位置
const cityClick = () => {
    router.push('/city');
}

const positionClick = () => {
    console.log('点击~');
    navigator.geolocation.getCurrentPosition((res) => {
        console.log('获取位置成功', res);
    }, err => {
        console.log('获取位置失败', err);

    }, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    })
}
</script>
<style lang="less" scoped>
.location {
    display: flex;
    height: 44px;
    line-height: 44px;
    justify-content: space-between;
    // align-items: center;

    .city {
        margin-left: 10px;
    }

    .position {
        display: flex;
        width: 90px;
        margin-right: 10px;
        justify-content: space-around;
        align-items: center;

        .text {
            font-size: 14px;
        }

        img {
            width: 18px;
        }
    }
}
</style>
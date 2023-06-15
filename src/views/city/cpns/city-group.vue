<template>
    <div class="group">
        <van-index-bar :index-list="indexList">

            <!-- 热门数据 -->
            <van-index-anchor index="热门" />
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities">
                    <div class="city" @click="cityClick(city)">
                        {{ city.cityName }}
                    </div>
                </template>
            </div>
            <!-- 地区数据 -->
            <template v-for="group in groupData.cities">
                <van-index-anchor :index="group.group" />
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <van-cell :title="city.cityName" @click="cityClick(city)" />
                </template>
            </template>
        </van-index-bar>

    </div>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/store/modules/city';
// 定义props
const props = defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})
// 动态索引
const indexList = computed(() => {
    let list = props.groupData.cities.map(item => item.group)
    list.unshift("#");
    return list;
})

// 监听城市的点击
const router = useRouter();
const cityStore = useCityStore();
const cityClick = (city) => {
    console.log(city);
    // 选中当前城市
    cityStore.currentCity = city;
    // 返回上一级
    router.back();
}
</script>
<style lang="less" scoped>
.list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 10px;
    padding-right: 25px;

    .city {
        width: 70px;
        height: 28px;
        line-height: 28px;
        border-radius: 14px;
        font-size: 12px;
        background-color: #fff4ec;
        color: #000;
        text-align: center;
        margin: 10px 0;
    }
}
</style>
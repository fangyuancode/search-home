<template>
    <div class="group">
        <van-index-bar>

            <!-- 热门数据 -->
            <van-index-anchor index="热门" />
            <div class="list">
                <template v-for="(city, index) in groupData.hotCities">
                    <div class="city">
                        {{ city.cityName }}
                    </div>
                </template>
            </div>
            <!-- 地区数据 -->
            <template v-for="group in groupData.cities">
                <van-index-anchor :index="group.group" />
                <template v-for="(city, indey) in group.cities" :key="indey">
                    <van-cell :title="city.cityName" />
                </template>
            </template>
        </van-index-bar>


        <!-- <template v-for="group in groupData.cities">
            <h2>标题：{{ group.group }}</h2>
            <div class="list">
                <div class="item">
                    <template v-for="(city, indey) in group.cities" :key="indey">
                        <div class="city">{{ city.cityName }}</div>
                    </template>
                </div>
            </div>
        </template> -->
    </div>
</template>
<script setup>
defineProps({
    groupData: {
        type: Object,
        default: () => ({})
    }
})
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
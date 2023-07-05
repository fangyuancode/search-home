<template>
    <div class="search-box">
        <!-- 位置信息 -->
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/home/icon_location.png" alt="">
            </div>
        </div>

        <!-- 日期范围 -->
        <div class="date-range" @click="showCalender = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDateStr }}</span>
                </div>
            </div>
            <div class="stay">
                共{{ stayCount }}晚
            </div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDateStr }}</span>
                </div>
            </div>
        </div>

        <van-calendar v-model:show="showCalender" type="range" @confirm="onConfirm" :formatter="formatter"
            color="#ff9854" />

        <!-- 价格和人数的选择 -->
        <div class="pricecount">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <div class="keyword"><span>
                关键字/位置/民宿
            </span></div>
        <!-- 热门建议 -->
        <div class="hot-suggest">
            <template v-for="(item, index) in hotSuggests" :key="index">
                <div class="item" :style="{
                    color: item.tagText.color,
                    background: item.tagText.background.color
                }">
                    {{ item.tagText.text }}</div>
            </template>
        </div>

        <!-- 搜索按钮 -->
        <div class="search-btn">
            <div class="btn" @click="searchClick">开始搜索</div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import useHomeStore from '@/store/modules/home';
import useCityStore from '@/store/modules/city'
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { formatMonthDay, getDiffDate } from '@/utils/format_date';
import useMainStore from '@/store/modules/main';

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
// 获取当前城市

const cityStore = useCityStore();
const { currentCity } = storeToRefs(cityStore);

// 日期范围的处理
const mainStore = useMainStore();
const { startDate, endDate } = storeToRefs(mainStore)
// 格式化当前时间
const startDateStr = computed(() => formatMonthDay(startDate.value));
const endDateStr = computed(() => formatMonthDay(endDate.value));
const stayCount = ref(getDiffDate(startDate.value, endDate.value));

// 日历
const formatter = (day) => {
    if (day.type === 'start') {
        day.bottomInfo = '入住';
    } else if (day.type === 'end') {
        day.bottomInfo = '离店';
    }
    return day;
};
const showCalender = ref(false)
const onConfirm = (value) => {
    // 1. 设置日期
    const selectStartDate = value[0];
    const selectEnDate = value[1];
    mainStore.startDate = selectStartDate;
    mainStore.endDate = selectEnDate
    stayCount.value = getDiffDate(selectStartDate, selectEnDate)
    // 2. 隐藏日历
    showCalender.value = false;
}

//  热门建议
const homeStore = useHomeStore();
const { hotSuggests } = storeToRefs(homeStore);

// 搜索按钮
const searchClick = () => {
    router.push({
        path: '/search',
        query: {
            startDate: startDate.value,
            endDate: endDate.value,
            currentCity: currentCity.value.cityName,
        }
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
        margin-left: 20px;
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

.date-range {
    display: flex;
    justify-content: space-between;
    height: 50px;
    // background-color: pink;
    align-items: center;
    border-top: 1px solid #f2f2f2;


    .start {
        margin-left: 20px;

        .date {
            display: flex;
            flex-direction: column;
            align-items: center;

            .tip {
                color: #808080;
                font-size: 13px;
                margin-left: -20px;
                margin-bottom: 3px;
            }
        }
    }

    .end {
        margin-right: 50px;

        .date {
            display: flex;
            flex-direction: column;
            align-items: center;

            .tip {
                color: #808080;
                font-size: 13px;
                margin-left: -20px;
                margin-bottom: 3px;
            }
        }
    }
}

.pricecount {

    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    color: #808080;
    border-top: 1px solid #f2f2f2;

    .start {
        margin-left: 20px;
    }

    .end {
        margin-right: 50px;
    }
}

.keyword {
    height: 40px;
    line-height: 40px;
    color: #808080;
    border-top: 1px solid #f2f2f2;

    span {
        margin-left: 20px;
    }

}

.hot-suggest {
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 10px;
    margin-left: 10px;

    .item {
        padding: 4px 8px;
        border-radius: 14px;
        margin: 3px 5px;
        font-size: 12px;
    }
}

.search-btn {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    .btn {
        width: 342px;
        height: 38px;
        font-weight: 500;
        max-height: 50px;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-liner-gradient);
    }
}
</style>
<template>
    <div class="city">
        <div class="top">
            <!-- 1.搜索框 -->
            <van-search shape="round" v-model="searchValue" placeholder="城市/区域/位置" @cancel="canaleClik" show-action />
            <!-- 2.tab切换 -->
            <van-tabs v-model:active="tabActive" color="#ff9854">
                <template v-for="(value, key, index) in allCites" :key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>

        </div>
        <div class="content">
            <template v-for="(value, key, index) in allCites" :key="index">
                <city-group v-show="tabActive === key" :group-data="value"></city-group>
            </template>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import useCityStore from '@/store/modules/city'
import { storeToRefs } from 'pinia';
import cityGroup from './cpns/city-group.vue';
const router = useRouter();

// 搜索框功能
const searchValue = ref('');
const canaleClik = () => {
    router.back();
}
// tab切换功能
const tabActive = ref('');

// 从Store中获取数据
const cityStore = useCityStore();
cityStore.fetchAllCitiesData();
const { allCites } = storeToRefs(cityStore);//toreToRefs对cityStore进行包裹，使其成为响应式数据

// 获取选择标签后的数据
// 1. 获取正确的key:将tabs中绑定的tabAction正确绑定
// 2. 更具我们的key,从allCities获取数据，默认直接获取的数据不是响应式的，所以必须包裹computed
// const currentGroup = computed(() => allCites.value[tabActive.value]);

</script>
<style lang="less" scoped>
.city {
    .top {
        position: relative;
        z-index: 9;
    }
// 布局滚动
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }
}

:deep(.van-index-anchor--sticky) {
    color: var(--primary-color);
}

:deep(.van-index-bar__index) {
    color: var(--primary-color);

}
</style>
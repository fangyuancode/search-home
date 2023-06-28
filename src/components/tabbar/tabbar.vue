<template>
    <div class="tabbar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
            <template v-for="(item, index) in tableDtata">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetsURL(item.Image)" alt="">
                        <img v-else :src="getAssetsURL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import tableDtata from '@/assets/data/tabbar';
import { getAssetsURL } from '@/utils/load_assets'
import { useRoute } from 'vue-router'
const route = useRoute();
console.log(route.path);

// 监听路由改变，找到对应的索引。
const currentIndex = ref(0);
watch(route, (newRoute) => {
    const index = tableDtata.findIndex((item) => item.path == newRoute.path)
    if (index === -1) return;
    currentIndex.value = index
})

</script>
<style lang="less" scoped>
.tabbar {
    --van-tabbar-item-font-size: 13px;
    // 找到类，对类中的CSS样式进行重写。
    // ：deep()找到子组件的类，让子组件的类生效。
    // :deep(.van-tbbbar-item_icon) {
    //     font-size: 50px;
    // }
    img {
        height: 28px;
    }


}
</style>
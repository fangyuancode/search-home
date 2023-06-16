<template>
    <div class="categories">
        <template v-for="(item, index) in categries" :key="item.id">
            <div class="item">
                <img :src="item.pictureUrl" alt="">
                <div class="text">{{ item.title }}</div>
            </div>
        </template>
    </div>
</template>
<script setup>
import useHomeStore from '@/store/modules/home'
import { storeToRefs } from 'pinia';

const homeStore = useHomeStore();
const { categries } = storeToRefs(homeStore)
</script>
<style lang="less" scoped>
.categories {
    display: flex;
    overflow-x: auto;
    height: 80px;
    margin-top: 10px;

    &::-webkit-scrollbar {
        display: none;
    }

    .item {
        flex-shrink: 0;
        text-align: center;
        width: 74px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            width: 32px;
            height: 32px;
        }

        .text {
            font-size: 12px;
            margin-top: 8px;
        }
    }

}
</style>
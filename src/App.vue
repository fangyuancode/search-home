<template>
  <div class="app">
    <router-view></router-view>
    <tabbar v-if="!route.meta.hideTabbar"></tabbar>
    <loading></loading>
  </div>
</template>
<script setup>
import tabbar from './components/tabbar/tabbar.vue';
import loading from './components/loading/loading.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
<style lang="less" scoped></style>
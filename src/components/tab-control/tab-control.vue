<template>
    <div class="tab-control">
        <template v-for="(item, index) in titles" :key="index">
            <div class="tab-control-item" :class="{ active: currentIndex == index }" @click="itemClick(index)">

                <!-- 2.子组件的值传递给父组件 -->
                <slot :itemsss="item" abc="cba">
                    <!-- 1.如果要将item传递到外部元素所在，使用作用插槽-->
                    <span> {{ item }}</span>
                </slot>

            </div>
        </template>
    </div>
</template>
<script>

export default {
    emits: ['itemClick'],
    props: {
        titles: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            currentIndex: 0,
        }
    },
    methods: {
        itemClick(index) {
            // console.log(index);
            this.currentIndex = index;
            this.$emit("itemClick", index);
        }
    }
}
</script>
<style scoped>
.tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
}

.tab-control-item {
    flex: 1;
}

.tab-control-item.active {
    color: var(--primary-color);
    font-weight: 700;

}

.tab-control-item.active span {
    border-bottom: 2px solid #ff9854;
    padding: 8px;
}
</style>
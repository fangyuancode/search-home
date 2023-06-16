import { defineStore } from "pinia";
import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from "@/service/index"
const useHomeStore = defineStore('', {
    state: () => ({
        hotSuggests: [],
        categries: [],
        currentPage: 1,
        houselist: [],
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeHotSuggests();
            this.hotSuggests = res.data;
        },
        async fetchCategoriesData() {
            const res = await getHomeCategories();
            this.categries = res.data;
        },
        async fetchHouselistData() {
            const res = await getHomeHouselist(this.currentPage++);
            // console.log(res);
            // 将每次请求的数据，展开，在push到数组里面去。
            this.houselist.push(...res.data);
        }
    }
})
export default useHomeStore;
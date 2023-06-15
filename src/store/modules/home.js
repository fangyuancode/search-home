import { defineStore } from "pinia";
import { getHomeHotSuggests } from "@/service/index"
const useHomeStore = defineStore('', {
    state: () => ({
        hotSuggests: [],
        categries: [],
    }),
    actions: {
        async fetchHotSuggestData() {
            const res = await getHomeHotSuggests();
            this.hotSuggests = res.data;

        }
    }
})
export default useHomeStore;
import { getCityAll } from "@/service";
import { defineStore } from "pinia";

const useCityStore = defineStore('city', {
    state: () => ({
        allCites: {},
    }),
    actions: {
        async fetchAllCitiesData() {
            const res = await getCityAll();
            this.allCites = res.data;
        }
    }
})

export default useCityStore;
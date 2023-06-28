import { defineStore } from "pinia";
// 日期范围的处理

const startDate = new Date();
const endDate = new Date();
// setDate() 方法用于设置一个月的某一天,getDate() 方法可返回月份的某一天。
endDate.setDate(startDate.getDate() + 1);
const useMainStore = defineStore("main", {
    state: () => ({
        token: '',
        startDate: startDate,
        endDate: endDate,
    })
})


export default useMainStore
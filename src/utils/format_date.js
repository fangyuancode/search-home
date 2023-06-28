import dayjs from "dayjs";

//计算日期
export function formatMonthDay(date,formatStr='MM月DD日') {
    // 传入日期，通过MM，DD做月份的格式化
    return dayjs(date).format(formatStr);
}
// 计算时间差
export function getDiffDate(startDate, endDate) {
    return dayjs(endDate).diff(startDate, "day")
}



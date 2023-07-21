import { onMounted, onUnmounted, onActivated, ref } from 'vue'
import { throttle } from 'underscore'

export default function useScroll(elRef) {
    let el = window;//设置默认为window

    // 通过变量判断是否达到底部
    const clientHeight = ref(0)
    const isReachBottom = ref(false);
    const scrollTop = ref(0);
    const scrollHeight = ref(0)
    // 监听window创建的滚动
    // 1. 当我们离开页面时，需要移除监听
    // 2. 别的页面也进行类似的监听，会重复编写代码

    // 函数执行频繁，采用防抖，节流
    const scrollListenerHandler = throttle(() => {
        // 当前滚动的是浏览器
        if (el === window) {
            // 当前客户端的高度
            clientHeight.value = document.documentElement.clientHeight;
            // 文档滚动距离
            scrollTop.value = document.documentElement.scrollTop;
            // 文档可以滚动的区域高度
            scrollHeight.value = document.documentElement.scrollHeight;
        } else {//当前滚动的元素
            // 当前元素的高度
            clientHeight.value = el.clientHeight;
            // 文档滚动距离
            scrollTop.value = el.scrollTop;
            // 文档可以滚动的区域高度
            scrollHeight.value = el.scrollHeight;
        }

        if (clientHeight.value + Math.ceil(scrollTop.value) >= scrollHeight.value) {
            console.log("滚动到底部了");
            isReachBottom.value = true;
        }
    }, 100)//间隔100毫秒

    // 挂载时，添加监听
    onMounted(() => {
        if (elRef) {
            el = elRef.value;
        }
        el.addEventListener("scroll", scrollListenerHandler)
    });
    // 活跃时
    onActivated(() => {
        el.addEventListener("scroll", scrollListenerHandler)
    })
    // 卸载时，移除监听
    onUnmounted(() => {
        el.removeEventListener("scroll", scrollListenerHandler)
    })
    // 将变量返回出去
    return { isReachBottom, scrollTop, scrollHeight };

}



// import { onMounted, onUnmounted, onActivated } from 'vue'
// export default function useScroll(reachBottomCallBack) {
//     // 监听window创建的滚动
//     // 1. 当我们离开页面时，需要移除监听
//     // 2. 别的页面也进行类似的监听，会重复编写代码
//     const scrollListenerHandler = () => {
//         // 当前客户端的高度
//         const clientHeight = document.documentElement.clientHeight;
//         // 文档滚动距离
//         const scrollTop = document.documentElement.scrollTop;
//         // 文档可以滚动的区域高度
//         const scrollHeight = document.documentElement.scrollHeight;
//         if (clientHeight + Math.ceil(scrollTop) >= scrollHeight) {
//             console.log("滚动到底部了");
//             if (reachBottomCallBack) {
//                 reachBottomCallBack();
//             }
//         }
//     }

//     // 挂载时，添加监听
//     onMounted(() => {
//         window.addEventListener("scroll", scrollListenerHandler)
//     });
//     // 活跃时
//     onActivated(() => {
//         window.addEventListener("scroll", scrollListenerHandler)
//     })
//     // 卸载时，移除监听
//     onUnmounted(() => {
//         window.removeEventListener("scroll", scrollListenerHandler)
//     })

// }
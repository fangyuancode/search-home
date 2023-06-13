import axios from 'axios'
import {BASE_URL,TIMEOUT} from './config'
// 封装一个类
class fyRequest {
    constructor(baseURL, timeout = 1000) {
        // 创建一个新的实例
        this.instance = axios.create({
            baseURL,
            timeout
        })
    }
    //传入的是Config对象
    request(config) {   //封装request方法,传进config
        return new Promise((resolve, reject) => {
            this.instance.request(config).then(res => {
                // console.log("fyRequest获取的res:", res);
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        })
    }

    // 封装get实例方法，传进config

    get(config) {
        return this.request({
            ...config, method: 'get'
        })
    }
    post(config) {
        return this.request({
            ...config, method: 'post'
        })
    }
}

// 可以创建多个实例
// const hyRequest1 = new fyRequest("http://123.207.32.32:9001");
// const hyRequest2 = new fyRequest("http://123.207.32.32:9002");

//new一个实例，再导出出去。相当于创建了一个对应的fyRequest对象，在用里面的对象方法
export default new fyRequest(BASE_URL,TIMEOUT);




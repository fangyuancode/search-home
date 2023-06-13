export const getAssetsURL = (image) => {
    // 参数一：相对路径，相对于当前文件的资源地址
    // 参数二：当前路径的url
    return new URL(`../assets/img/${image}`, import.meta.url).href;//将图片地址变成动态的url地址。
}
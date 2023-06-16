import fyRequest from '../request/index'
export function getHomeHotSuggests() {
    return fyRequest.get({
        url: '/home/hotSuggests'
    })
}

export function getHomeCategories() {
    return fyRequest.get({
        url: '/home/categories'
    })
}

export function getHomeHouselist(currentPage) {
    return fyRequest.get({
        url: '/home/houselist',
        params:{
            page:currentPage,
        }
    })
}
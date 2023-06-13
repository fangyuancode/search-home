import fyRequest from '@/service/request'
export const getCityAll = () => {
    return fyRequest.get({
        url: '/city/all',
    })
}
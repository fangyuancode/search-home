import fyRequest from '../request/index'
export function getHomeHotSuggests() {
    return fyRequest.get({
        url: '/home/hotSuggests'
    })
}
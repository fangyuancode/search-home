import fyRequest from '../request/index'

export function getDetailInfo(houseId) {
    return fyRequest.get({
        url: '/detail/infos',
        params: {
            houseId
        }
    })
}


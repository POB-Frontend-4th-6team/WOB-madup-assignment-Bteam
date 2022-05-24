import { IAdsItem } from 'types/ads'
import { axios } from 'hooks/worker'

const DATA_URL = 'http://localhost:1004/adlist'

export const getAdsItemList = () => axios.get<{ count: number; ads: IAdsItem[] }>(DATA_URL)

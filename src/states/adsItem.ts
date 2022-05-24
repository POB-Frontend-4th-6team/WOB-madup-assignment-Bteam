import { IAdsItem } from 'types/ads'
import { atom } from 'hooks/state/index'

export const adsListState = atom<IAdsItem[]>({
  key: 'adsItemList',
  default: [],
})

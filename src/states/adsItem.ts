import { IAdsItem } from 'types/advertiseManage'
import { atom } from 'hooks/state/index'

export const adsListState = atom<IAdsItem[]>({
  key: 'adsItemList',
  default: [],
})

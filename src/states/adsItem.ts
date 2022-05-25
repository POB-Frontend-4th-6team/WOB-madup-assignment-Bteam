import { IAdsItem } from 'types/advertiseManage'
import { atom } from 'hooks/state/index'

export const adsListState = atom<IAdsItem[]>({
  key: 'adsItemList',
  default: [],
})

export const menuState = atom<boolean>({
  key: 'menuOpenState',
  default: false,
})

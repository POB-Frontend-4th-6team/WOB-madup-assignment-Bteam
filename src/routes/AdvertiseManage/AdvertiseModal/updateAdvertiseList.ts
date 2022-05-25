import store from 'store'
import { IAdsItem } from 'types/advertiseManage'

interface IUseUpdateAdvertiseProps {
  prevList: IAdsItem[]
  tempAdItem: IAdsItem
}

export const updateAdvertiseList = ({ prevList, tempAdItem }: IUseUpdateAdvertiseProps) => {
  store.remove('ads_list')
  const newAdvertiseList = JSON.parse(JSON.stringify(prevList))
  const adIndex = newAdvertiseList.findIndex((item: IAdsItem) => item.id === tempAdItem.id)
  if (adIndex === -1) {
    store.set('ads_list', [...newAdvertiseList, tempAdItem])
    return [...newAdvertiseList, tempAdItem]
  }

  // TODO: 밑에..
  newAdvertiseList[adIndex].title = tempAdItem.title
  newAdvertiseList[adIndex].adType = tempAdItem.adType
  newAdvertiseList[adIndex].budget = tempAdItem.budget
  store.set('ads_list', [...newAdvertiseList])
  return [...newAdvertiseList]
}

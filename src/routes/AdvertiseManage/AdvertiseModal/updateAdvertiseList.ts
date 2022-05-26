import store from 'store'
import { IAdsItem } from 'types/advertiseManage'

interface IUseUpdateAdvertiseProps {
  prevList: IAdsItem[]
  tempAdItem: IAdsItem
}

export const updateAdvertiseList = ({ prevList, tempAdItem }: IUseUpdateAdvertiseProps) => {
  store.remove('adsList')

  const newAdvertiseList = JSON.parse(JSON.stringify(prevList))
  const adIndex = newAdvertiseList.findIndex((item: IAdsItem) => item.id === tempAdItem.id)

  if (adIndex === -1) {
    store.set('adsList', [tempAdItem, ...newAdvertiseList])
    return [tempAdItem, ...newAdvertiseList]
  }

  const { title, adType, budget } = tempAdItem
  newAdvertiseList[adIndex].title = title
  newAdvertiseList[adIndex].adType = adType
  newAdvertiseList[adIndex].budget = budget

  store.set('adsList', [...newAdvertiseList])
  return [...newAdvertiseList]
}

import { IAdsItem } from 'types/advertiseManage'

// TODO: 수정
export const filterAdsItems = (item: IAdsItem, status: string) => {
  switch (status) {
    case '전체 광고':
      return true
    case '진행 광고':
      return item.status === 'active'
    case '중지 광고':
      return item.status === 'ended'
    default:
      return true
  }
}

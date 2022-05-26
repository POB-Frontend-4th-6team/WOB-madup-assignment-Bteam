import { useQuery } from 'react-query'
import { getAdsItemListAPI } from 'services/ads'
import { IAdsItem } from 'types/advertiseManage'

export const useGetAdsList = () => {
  const { isLoading, data } = useQuery(
    ['getAdsList'],
    () =>
      getAdsItemListAPI().then((response): IAdsItem[] => {
        return response
      }),
    {
      staleTime: 6 * 50 * 1000,
      select: (value): IAdsItem[] => {
        if (!value.length) return []
        const tempValue = [...value]
        tempValue.sort((a, b) => b.id - a.id)
        return tempValue
      },
    }
  )

  return { data, isLoading }
}

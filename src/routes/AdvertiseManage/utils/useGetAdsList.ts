import { useQuery } from 'react-query'
import { getAdsItemList } from 'services/ads'
import { IAdsItem } from 'types/advertiseManage'

// TODO: 분리
export const useGetAdsList = () => {
  const { isLoading, data } = useQuery(
    ['getAdsList'],
    () =>
      getAdsItemList().then((response): IAdsItem[] => {
        return response.ads
      }),
    {
      staleTime: 6 * 50 * 1000,
      retryDelay: 7000,
      useErrorBoundary: true,
      select: (value): IAdsItem[] => {
        if (!value.length) return []
        return value
      },
    }
  )

  return { data, isLoading }
}

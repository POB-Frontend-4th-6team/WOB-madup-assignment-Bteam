import { useQuery } from 'react-query'
import { getAdsItemListAPI } from 'services/ads'
import { IAdsItem } from 'types/advertiseManage'

// TODO: 분리
export const useGetAdsList = () => {
  const { isLoading, data } = useQuery(
    ['getAdsList'],
    () =>
      getAdsItemListAPI().then((response): IAdsItem[] => {
        return response
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

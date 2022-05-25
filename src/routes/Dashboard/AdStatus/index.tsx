import { useQuery } from 'react-query'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useMount } from 'react-use'
import store from 'store'

import { dailyDataResultState, dailyFetchState, prevDailyDataResultState } from 'states/dashboard'
import { getDailyData } from 'services/ads'

import Chart from './Chart'
import StatusCard from './StatusCard'
import styles from './adStatus.module.scss'

const AdStatus = () => {
  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')

  const prevStartDate = store.get('prevStartDate')
  const prevEndDate = store.get('prevEndDate')

  const [dailyFetch, setDailyFetch] = useRecoilState(dailyFetchState)
  const setDailyData = useSetRecoilState(dailyDataResultState)
  const setPrevDailyData = useSetRecoilState(prevDailyDataResultState)

  useMount(() => {
    getDailyData(currentStartDate, currentEndDate).then((res) => {
      setDailyData(res.data)
    })
    getDailyData(prevStartDate, prevEndDate).then((res) => {
      setPrevDailyData(res.data)
    })
  })

  const { isLoading: isDailyLoading } = useQuery(
    ['getDailyData', currentStartDate, currentEndDate],
    () => {
      getDailyData(currentStartDate, currentEndDate).then((res) => {
        setDailyData(res.data)
      })
    },
    {
      useErrorBoundary: true,
      enabled: !!dailyFetch,
      onSuccess: () => {
        setDailyFetch(false)
      },
    }
  )

  const { data: prevDailyDataResult } = useQuery(
    ['getPrevDailyData', prevStartDate, prevEndDate],
    () => {
      getDailyData(prevStartDate, prevEndDate).then((res) => {
        setPrevDailyData(res.data)
      })
    },
    {
      useErrorBoundary: true,
      enabled: !!dailyFetch,
      onSuccess: () => {
        setDailyFetch(false)
      },
    }
  )

  return (
    <section className={styles.adSectionWrapper}>
      <h3 className={styles.adSectionTitle}>통합 광고 현황</h3>
      <div className={styles.boardWrapper}>
        <StatusCard />
        <Chart />
      </div>
    </section>
  )
}

export default AdStatus

import { useQuery } from 'react-query'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useMount } from 'react-use'
import store from 'store'

import { dailyDataResultState, dailyFetchState, prevDailyDataResultState } from 'states/dashboard'
import { getDailyData } from 'services/ads'

import Chart from './Chart'
import StatusCard from './StatusCard'
import styles from './adStatus.module.scss'
import Loading from 'routes/_shared/Loading'
import { useState } from 'react'

const AdStatus = () => {
  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')

  const prevStartDate = store.get('prevStartDate')
  const prevEndDate = store.get('prevEndDate')

  const [dailyFetch, setDailyFetch] = useRecoilState(dailyFetchState)
  const setDailyData = useSetRecoilState(dailyDataResultState)
  const setPrevDailyData = useSetRecoilState(prevDailyDataResultState)
  const [loading, setLoading] = useState(false)

  useMount(() => {
    setLoading(true)
    getDailyData(currentStartDate, currentEndDate).then((res) => {
      setDailyData(res.data)
    })
    getDailyData(prevStartDate, prevEndDate)
      .then((res) => {
        setPrevDailyData(res.data)
      })
      .finally(() => setLoading(false))
  })

  const { isLoading } = useQuery(
    ['getDailyData', currentStartDate, currentEndDate],
    () => {
      setLoading(true)
      getDailyData(currentStartDate, currentEndDate)
        .then((res) => {
          setDailyData(res.data)
        })
        .finally(() => setLoading(false))
    },
    {
      useErrorBoundary: true,
      enabled: !!dailyFetch,
      retryDelay: 7000,
      onSuccess: () => {
        setDailyFetch(false)
      },
    }
  )

  useQuery(
    ['getPrevDailyData', prevStartDate, prevEndDate],
    () => {
      setLoading(true)
      getDailyData(prevStartDate, prevEndDate)
        .then((res) => {
          setPrevDailyData(res.data)
        })
        .finally(() => setLoading(false))
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
        {loading ? (
          <Loading />
        ) : (
          <>
            <StatusCard />
            <Chart />
          </>
        )}
      </div>
    </section>
  )
}

export default AdStatus

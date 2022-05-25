import { useQuery } from 'react-query'
import { useState, useMount } from 'hooks'
import { useRecoilState, useSetRecoilState } from 'hooks/state'
import store from 'store'

import {
  byChannelDataResultState,
  byChannelFetchState,
  dailyDataResultState,
  dailyFetchState,
  prevDailyDataResultState,
} from 'states/dashboard'
import { getDailyData, getByChannelData, getPrevDailyData } from 'services/ads'

import AdCardContent from './AdCardContent'
import CalendarModal from './CalendarModal/CalendarModal'
import Chart from './Chart'
import CurrentStatusOfMedium from './CurrentStatusOfMedium'

import { getDailyData, getByChannelData } from 'services/ads'
import { DownArrow } from 'assets/svgs'
import Loading from 'routes/_shared/Loading'
import styles from './dashboard.module.scss'

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')
  const prevStartDate = store.get('prevStartDate')
  const prevEndDate = store.get('prevEndDate')

  const [dailyFetch, setDailyFetch] = useRecoilState(dailyFetchState)
  const [byChannelFetch, setByChannelFetch] = useRecoilState(byChannelFetchState)
  const setDailyData = useSetRecoilState(dailyDataResultState)
  const setPrevDailyData = useSetRecoilState(prevDailyDataResultState)
  const setByChannelData = useSetRecoilState(byChannelDataResultState)

  useMount(() => {
    getDailyData(currentStartDate, currentEndDate).then((res) => {
      setDailyData(res.data)
    })
    getPrevDailyData(prevStartDate, prevEndDate).then((res) => {
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
    ['getPrveDailyData', prevStartDate, prevEndDate],
    () => {
      getPrevDailyData(prevStartDate, prevEndDate).then((res) => {
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

  const { isLoading: isChannelLoading } = useQuery(
    ['getByChannelData', currentStartDate, currentEndDate],
    () => {
      getByChannelData(currentStartDate, currentEndDate, setByChannelData)
    },
    {
      useErrorBoundary: true,
      enabled: !!byChannelFetch,
      staleTime: 6 * 50 * 1000,
      onSuccess: () => {
        setByChannelFetch(false)
      },
    }
  )

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  if (isDailyLoading || isChannelLoading) {
    return <Loading />
  }

  return (
    <div>
      <header className={styles.header}>
        <h2>대시보드</h2>
        <div className={styles.calendarContainer}>
          <button className={styles.calendarOpenButton} type='button' onClick={handleOpenModal}>
            {`${currentStartDate} ~ ${currentEndDate}`}
            <DownArrow />
          </button>
          {isModalOpen && (
            <div className={styles.calendar}>
              <CalendarModal setIsModalOpen={setIsModalOpen} />
            </div>
          )}
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.adSectionWrapper}>
          <h2 className={styles.adSectionTitle}>통합 광고 현황</h2>
          <div className={styles.boardWrapper}>
            <AdCardContent />
            <Chart />
          </div>
        </div>
        <div className={styles.currentStatusOfMediumSectionWrapper}>
          <h2 className={styles.currentStatusOfMediumTitle}>매체 현황</h2>
          <CurrentStatusOfMedium />
        </div>
      </main>
    </div>
  )
}
export default Dashboard

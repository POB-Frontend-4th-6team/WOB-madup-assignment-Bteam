import { Dispatch, SetStateAction, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { DateRange } from 'react-date-range'
import { ko } from 'date-fns/locale'
import dayjs from 'dayjs'

import { byChannelFetchState, dailyFetchState } from 'states/dashboard'

import styles from './calendarModal.module.scss'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { LogoIcon } from 'assets/svgs'

interface IProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
  setCurrentStartDate: Dispatch<SetStateAction<string>>
  setCurrentEndDate: Dispatch<SetStateAction<string>>
}

const CalendarModal = ({ setIsModalOpen, setCurrentStartDate, setCurrentEndDate }: IProps) => {
  const [dateRange, setDateRange] = useState<any>([
    {
      startDate: new Date(2022, 1, 1),
      endDate: new Date(2022, 1, 2),
      key: 'selection',
    },
  ])

  const setDailyFetch = useSetRecoilState(dailyFetchState)
  const setByChannelFetch = useSetRecoilState(byChannelFetchState)

  const startDateTransformed = dayjs(dateRange[0].startDate).format('YYYY-MM-DD')
  const endDateTransformed = dayjs(dateRange[0].endDate).format('YYYY-MM-DD')

  // console.log(startDateTransformed)
  // console.log(endDateTransformed)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleGetData = () => {
    setCurrentStartDate(startDateTransformed)
    setCurrentEndDate(endDateTransformed)
    setDailyFetch(true)
    setByChannelFetch(true)
    setIsModalOpen(false)
  }

  return (
    <div className={styles.calendarModalContainer}>
      <DateRange
        editableDateInputs={false}
        onChange={(item) => setDateRange([item.selection])}
        ranges={dateRange}
        locale={ko}
        months={2}
        direction='horizontal'
        dateDisplayFormat='yyyy년 MM월 dd일'
        // showDateDisplay={false}
      />
      <div className={styles.buttonContainer}>
        <button className={styles.button} type='button' onClick={handleModalClose}>
          닫기
        </button>
        <button className={styles.button} type='button' onClick={handleGetData}>
          적용
        </button>
      </div>
    </div>
  )
}

export default CalendarModal

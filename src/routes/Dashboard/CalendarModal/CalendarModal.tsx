import { Dispatch, SetStateAction, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { DateRange } from 'react-date-range'
import { ko } from 'date-fns/locale'
import dayjs from 'dayjs'
import store from 'store'

import { byChannelFetchState, dailyFetchState } from 'states/dashboard'

import styles from './calendarModal.module.scss'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import Button from 'components/Button'

interface IProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

const currentStartDate = store.get('startDate')
const currentEndDate = store.get('endDate')

if (!currentStartDate && !currentEndDate) {
  store.set('startDate', '2022-04-14')
  store.set('endDate', '2022-04-20')
  store.set('prevEndDate', '2022-04-13')
  store.set('prevStartDate', '2022-04-07')
}

const CalendarModal = ({ setIsModalOpen }: IProps) => {
  const [currentCalendarStartDate] = useState(store.get('startDate'))
  const [currentCalenderEndDate] = useState(store.get('endDate'))
  const [dateRange, setDateRange] = useState<any>([
    {
      startDate: new Date(dayjs(currentCalendarStartDate).format('YYYY-MM-DD')),
      endDate: new Date(dayjs(currentCalenderEndDate).format('YYYY-MM-DD')),
      key: 'selection',
    },
  ])

  const setDailyFetch = useSetRecoilState(dailyFetchState)
  const setByChannelFetch = useSetRecoilState(byChannelFetchState)

  const startDateTransformed = dayjs(dateRange[0].startDate).format('YYYY-MM-DD')
  const endDateTransformed = dayjs(dateRange[0].endDate).format('YYYY-MM-DD')

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleGetData = () => {
    const diffSelectedDate = dayjs(endDateTransformed).diff(dayjs(startDateTransformed), 'day')
    store.set('startDate', startDateTransformed)
    store.set('endDate', endDateTransformed)
    const prevDate = dayjs(startDateTransformed).subtract(1, 'day').format('YYYY-MM-DD')
    store.set('prevEndDate', dayjs(startDateTransformed).subtract(1, 'day').format('YYYY-MM-DD'))
    store.set('prevStartDate', dayjs(prevDate).subtract(diffSelectedDate, 'day').format('YYYY-MM-DD'))
    setDailyFetch(true)
    setByChannelFetch(true)
    setIsModalOpen(false)
  }

  return (
    <div className={styles.calendarModalContainer}>
      <section className={styles.pickedDateDisplay}>
        {startDateTransformed} ~ {endDateTransformed}
      </section>
      <section className={styles.calendar}>
        <DateRange
          editableDateInputs={false}
          onChange={(item) => setDateRange([item.selection])}
          ranges={dateRange}
          locale={ko}
          months={2}
          direction='horizontal'
          dateDisplayFormat='yyyy년 MM월 dd일'
          minDate={new Date('2022-02-01')}
          maxDate={new Date('2022-04-20')}
          showPreview={false}
          showDateDisplay={false}
          monthDisplayFormat='yyyy년 m월'
          rangeColors={['#586cf5']}
        />
      </section>

      <div className={styles.buttonContainer}>
        <Button
          text='닫기'
          width='100px'
          height='40px'
          border='1px solid #94a2ad'
          color='black'
          borderRadius='10px'
          onClick={handleModalClose}
        />
        <Button
          text='적용'
          width='100px'
          height='40px'
          backgroundColor='#586cf5'
          color='white'
          borderRadius='10px'
          onClick={handleGetData}
        />
      </div>
    </div>
  )
}

export default CalendarModal

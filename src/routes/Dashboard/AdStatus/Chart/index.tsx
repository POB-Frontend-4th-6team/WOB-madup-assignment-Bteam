import { useState } from 'react'
import store from 'store'

import { useRecoilState } from 'hooks/state'
import { dailyDataResultState } from 'states/dashboard'
import { convertDailyData, convertWeeklyData } from './utils'

import DropDown from 'routes/_shared/DropDown'
import ChartItem from './ChartItem'
import styles from '../adStatus.module.scss'

const CATEGORY_SELECT_LIST = ['ROAS', '광고비', '노출 수', '클릭 수', '전환 수', '매출', '없음']
const PERIOD_SELECT_LIST = ['일간', '주간']

const Chart = (): JSX.Element => {
  const [dailyData] = useRecoilState(dailyDataResultState)

  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')
  const currentPeriodSelect = store.get('dayOrWeek')

  const [firstSelect, setFirstSelect] = useState(CATEGORY_SELECT_LIST[0])
  const [secondSelect, setSecondSelect] = useState(CATEGORY_SELECT_LIST[1])
  const [periodSelect, setPeriodSelect] = useState(PERIOD_SELECT_LIST[0])

  const { roasDaily, costDaily, impDaily, clickDaily, convDaily, salesDaily } = convertDailyData(dailyData)
  const { roasWeekly, costWeekly, impWeekly, clickWeekly, convWeekly, salesWeekly } = convertWeeklyData(
    dailyData,
    currentStartDate,
    currentEndDate
  )

  const listForDropDownA = CATEGORY_SELECT_LIST.filter((title) => title !== '없음' && title !== secondSelect)
  const listForDropDownB = CATEGORY_SELECT_LIST.filter((title) => title !== firstSelect)

  const getDailyData = (dataKey: string) => {
    return (
      {
        ROAS: roasDaily,
        광고비: costDaily,
        '노출 수': impDaily,
        '클릭 수': clickDaily,
        '전환 수': convDaily,
        매출: salesDaily,
      }[dataKey] ?? undefined
    )
  }

  const getWeeklyData = (dataKey: string) => {
    return (
      {
        ROAS: roasWeekly,
        광고비: costWeekly,
        '노출 수': impWeekly,
        '클릭 수': clickWeekly,
        '전환 수': convWeekly,
        매출: salesWeekly,
      }[dataKey] ?? undefined
    )
  }

  let firstData =
    {
      일간: getDailyData(firstSelect),
      주간: getWeeklyData(firstSelect),
    }[periodSelect] ?? undefined

  let secondData

  if (currentPeriodSelect === '일간') {
    firstData = getDailyData(firstSelect)
    secondData = getDailyData(secondSelect)
  } else {
    firstData = getWeeklyData(firstSelect)
    secondData = getWeeklyData(secondSelect)
  }

  return (
    <>
      <div className={styles.dropDownsContainer}>
        <div className={styles.dropDownWrapper}>
          <DropDown
            selectName='firstCategory'
            selectList={listForDropDownA}
            setCurrentSelect={setFirstSelect}
            size='small'
          />
          <DropDown
            selectName='secondCategory'
            selectList={listForDropDownB}
            setCurrentSelect={setSecondSelect}
            size='small'
          />
        </div>
        <div>
          <DropDown
            selectName='dayOrWeek'
            selectList={PERIOD_SELECT_LIST}
            setCurrentSelect={setPeriodSelect}
            size='small'
          />
        </div>
      </div>

      <div className={styles.chartContainer}>
        <ChartItem firstData={firstData} secondData={secondData} />
      </div>
    </>
  )
}

export default Chart

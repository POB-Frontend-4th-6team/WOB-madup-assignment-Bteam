import { useState } from 'react'
import store from 'store'

import { useRecoilState } from 'hooks/state'
import { dailyDataResultState } from 'states/dashboard'
import { convertDailyData, convertWeeklyData } from './utils'

import DropDown from 'routes/_shared/DropDown'
import ChartItem from './ChartItem'
import styles from '../adStatus.module.scss'

const SELECT_LIST = ['ROAS', '광고비', '노출 수', '클릭 수', '전환 수', '매출', '없음']
const PERIOD_SELECT_LIST = ['일간', '주간']

const Chart = (): JSX.Element => {
  const [dailyData] = useRecoilState(dailyDataResultState)

  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')

  const [firstSelect, setFirstSelect] = useState(SELECT_LIST[0])
  const [secondSelect, setSecondSelect] = useState(SELECT_LIST[1])
  const [periodSelect, setPeriodSelect] = useState(PERIOD_SELECT_LIST[0])

  const { roas, cost, imp, click, conv, sales } = convertDailyData(dailyData)

  const listForDropDownA = SELECT_LIST.filter((title) => title !== '없음' && title !== secondSelect)
  const listForDropDownB = SELECT_LIST.filter((title) => title !== firstSelect)

  const getDailyData = (dataKey: string) => {
    return (
      {
        ROAS: roas,
        광고비: cost,
        '노출 수': imp,
        '클릭 수': click,
        '전환 수': conv,
        매출: sales,
      }[dataKey] ?? null
    )
  }

  let firstData = null
  let secondData = null

  if (periodSelect === '일간') {
    firstData = getDailyData(firstSelect)
    secondData = getDailyData(secondSelect)
  } else {
    const {
      roas: roasWeekly,
      cost: costWeekly,
      imp: impWeekly,
      click: clickWeekly,
      conv: convWeekly,
      sales: salesWeekly,
    } = convertWeeklyData(dailyData, currentStartDate, currentEndDate)

    const getWeeklyData = (dataKey: string) => {
      return (
        {
          ROAS: roasWeekly,
          광고비: costWeekly,
          '노출 수': impWeekly,
          '클릭 수': clickWeekly,
          '전환 수': convWeekly,
          매출: salesWeekly,
        }[dataKey] ?? null
      )
    }

    firstData = getWeeklyData(firstSelect)
    secondData = getWeeklyData(secondSelect)
  }

  return (
    <>
      <div className={styles.dropDownsContainer}>
        <div className={styles.dropDownWrapper}>
          <DropDown
            selectName='a'
            selectList={listForDropDownA}
            currentSelect={firstSelect}
            setCurrentSelect={setFirstSelect}
            size='small'
          />
          <DropDown
            selectName='b'
            selectList={listForDropDownB}
            currentSelect={secondSelect}
            setCurrentSelect={setSecondSelect}
            size='small'
          />
        </div>
        <div>
          <DropDown
            selectName='c'
            selectList={PERIOD_SELECT_LIST}
            currentSelect={periodSelect}
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

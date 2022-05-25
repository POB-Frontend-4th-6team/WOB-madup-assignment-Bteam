import { useState } from 'react'

import { useRecoilState } from 'hooks/state'
import { dailyDataResultState } from 'states/dashboard'
import { convertData } from './utils'

import DropDown from 'routes/_shared/DropDown'
import ChartItem from './ChartItem'
import styles from './chart.module.scss'

const SELECT_LIST = ['ROAS', '광고비', '노출 수', '클릭 수', '전환 수', '매출', '없음']
const PERIOD_SELECT_LIST = ['일간', '주간']

const Chart = (): JSX.Element => {
  const [dailyData] = useRecoilState(dailyDataResultState)

  const [firstSelect, setFirstSelect] = useState(SELECT_LIST[0])
  const [secondSelect, setSecondSelect] = useState(SELECT_LIST[0])
  const [periodSelect, setPeriodSelect] = useState(PERIOD_SELECT_LIST[0])

  const { roas, cost, imp, click, conv, sales } = convertData(dailyData)

  const getData = (dataKey: string) => {
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

  const firstData = getData(firstSelect)
  const secondData = getData(secondSelect)

  return (
    <>
      <div className={styles.dropDownsContainer}>
        <div className={styles.dropDownWrapper}>
          <DropDown
            selectList={SELECT_LIST}
            currentSelect={firstSelect}
            setCurrentSelect={setFirstSelect}
            size='small'
          />
          <DropDown
            selectList={SELECT_LIST}
            currentSelect={secondSelect}
            setCurrentSelect={setSecondSelect}
            size='small'
          />
        </div>
        <div>
          <DropDown
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

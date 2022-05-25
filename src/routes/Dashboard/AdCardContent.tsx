import { useRecoilState } from 'recoil'
import store from 'store'

import { dailyDataResultState, prevDailyDataResultState } from 'states/dashboard'
import { ICardContentData } from 'types/dashboard'
import { dataProcess, processCardData } from 'utils/adDataProcess'

import styles from './dashboard.module.scss'
import { DecreaseIcon, IncreaseIcon } from 'assets/svgs'

const AdCardContent = () => {
  const currentStartDate = store.get('startDate')
  const currentEndDate = store.get('endDate')
  const prevStartDate = store.get('prevStartDate')
  const prevEndDate = store.get('prevEndDate')
  const [dailyData] = useRecoilState(dailyDataResultState)
  const [prevDailyData] = useRecoilState(prevDailyDataResultState)

  const sumData = dataProcess(currentStartDate, currentEndDate, dailyData)
  const sumPrevData = dataProcess(prevStartDate, prevEndDate, prevDailyData)

  const adCardContent: ICardContentData[] = processCardData(sumData, sumPrevData)

  return (
    <ul className={styles.adCardWrapper}>
      {adCardContent.length > 0 &&
        adCardContent.map((item) => (
          <li key={item.title} className={styles.adCardContent}>
            <dl>
              <dt>{item.title}</dt>
              <dd>{item.value}</dd>
            </dl>
            <div className={styles.changeWrapper}>
              {item.increase ? <IncreaseIcon /> : <DecreaseIcon />}
              <span>{item.change}</span>
            </div>
          </li>
        ))}
    </ul>
  )
}

export default AdCardContent

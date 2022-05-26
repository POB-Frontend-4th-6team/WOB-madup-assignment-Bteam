import { useRecoilState } from 'recoil'

import { byChannelDataResultState } from 'states/dashboard'
import { IVictoryBarData } from 'types/dashboard'
import { channelDataProcess } from 'utils/adDataProcess'

import Recharts from './Recharts'
import Table from './Table'
import styles from './currentStatusOfMedium.module.scss'

const CurrentStatusOfMedium = () => {
  const [byChannelData] = useRecoilState(byChannelDataResultState)

  const combinedAllChannelDataObj: any = {
    google: channelDataProcess(byChannelData, 'google'),
    naver: channelDataProcess(byChannelData, 'naver'),
    facebook: channelDataProcess(byChannelData, 'facebook'),
    kakao: channelDataProcess(byChannelData, 'kakao'),
  }

  const combinedAllChannelDataArr = [
    channelDataProcess(byChannelData, 'google'),
    channelDataProcess(byChannelData, 'facebook'),
    channelDataProcess(byChannelData, 'naver'),
    channelDataProcess(byChannelData, 'kakao'),
  ]

  const createVictoryBarData = (channel: string) => {
    const result: IVictoryBarData[] = []
    for (const key in combinedAllChannelDataObj[channel]) {
      if (key === 'sales' || key === 'cost' || key === 'imp' || key === 'click' || key === 'convValue')
        result.push({
          xAxis: key,
          yAxis: Math.round(
            (combinedAllChannelDataObj[channel][key] /
              (combinedAllChannelDataObj.google[key] +
                combinedAllChannelDataObj.naver[key] +
                combinedAllChannelDataObj.facebook[key] +
                combinedAllChannelDataObj.kakao[key])) *
              100
          ),
        })
    }
    return result
  }

  const calculatingSumOfColumns = (column: string) => {
    return (
      combinedAllChannelDataObj.google[column] +
      combinedAllChannelDataObj.naver[column] +
      combinedAllChannelDataObj.facebook[column] +
      combinedAllChannelDataObj.kakao[column]
    )
  }

  return (
    <section className={styles.currentStatusOfMediumSectionWrapper}>
      <h3 className={styles.currentStatusOfMediumTitle}>매체 현황</h3>
      <div className={styles.currentStatusOfMediumContainer}>
        <div className={styles.rechartsContainer}>
          <Recharts createVictoryBarData={createVictoryBarData} />
        </div>
        <div className={styles.tableContainer}>
          <Table
            combinedAllChannelDataArr={combinedAllChannelDataArr}
            calculatingSumOfColumns={calculatingSumOfColumns}
          />
        </div>
      </div>
    </section>
  )
}

export default CurrentStatusOfMedium

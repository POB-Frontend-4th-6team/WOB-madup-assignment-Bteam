/* eslint-disable react/style-prop-object */
import styles from './CurrentStatusOfMedium.module.scss'
import { useRecoilState } from 'recoil'
import { byChannelDataResultState } from 'states/dashboard'
import Recharts from './Recharts'
import Table from './Table'

const CurrentStatusOfMedium = () => {
  const [byChannelData] = useRecoilState(byChannelDataResultState)
  // console.log(byChannelData)

  const reduceChannelData = (_channel: string) => {
    const fiteredDate = byChannelData.filter((el: { channel: string }) => el.channel === _channel)
    return fiteredDate.reduce((acc, cur, i) => {
      if (i === fiteredDate.length - 1) {
        return {
          sales: cur.sales + acc.sales,
          channel: cur.channel,
          cost: cur.cost + acc.cost,
          imp: cur.imp + acc.imp,
          click: cur.click + acc.click,
          convValue: cur.convValue + acc.convValue,
          ctr: (cur.ctr + acc.ctr) / fiteredDate.length,
          cpc: (cur.cpc + acc.cpc) / fiteredDate.length,
          roas: (cur.roas + acc.roas) / fiteredDate.length,
        }
      }
      return {
        sales: cur.sales + acc.sales,
        channel: cur.channel,
        cost: cur.cost + acc.cost,
        imp: cur.imp + acc.imp,
        click: cur.click + acc.click,
        convValue: cur.convValue + acc.convValue,
        ctr: cur.ctr + acc.ctr,
        cpc: cur.cpc + acc.cpc,
        roas: cur.roas + acc.roas,
      }
    })
  }

  const reducedAllChannelDataObj: any = {
    google: reduceChannelData('google'),
    naver: reduceChannelData('naver'),
    facebook: reduceChannelData('facebook'),
    kakao: reduceChannelData('kakao'),
  }

  const reducedAllChannelDataArr = [
    reduceChannelData('google'),
    reduceChannelData('facebook'),
    reduceChannelData('naver'),
    reduceChannelData('kakao'),
  ]

  const createVictoryBarData = (channel: string) => {
    const result = []
    // eslint-disable-next-line guard-for-in
    for (const key in reducedAllChannelDataObj[channel]) {
      if (key === 'sales' || key === 'cost' || key === 'imp' || key === 'click' || key === 'convValue')
        result.push({
          xAxis: key,
          yAxis: Math.round(
            (reducedAllChannelDataObj[channel][key] /
              (reducedAllChannelDataObj.google[key] +
                reducedAllChannelDataObj.naver[key] +
                reducedAllChannelDataObj.facebook[key] +
                reducedAllChannelDataObj.kakao[key])) *
              100
          ),
        })
    }
    return result
  }
  // console.log(reducedAllChannelDataObj, 'reducedAllChannelDataObj')
  // console.log(reducedAllChannelDataArr, 'reducedAllChannelDataArr')
  // console.log(createVictoryBarData('facebook'), 'createVictoryBarData')

  const CalculatingSumOfColumns = (column: string) => {
    return (
      reducedAllChannelDataObj.google[column] +
      reducedAllChannelDataObj.naver[column] +
      reducedAllChannelDataObj.facebook[column] +
      reducedAllChannelDataObj.kakao[column]
    )
  }
  return (
    <div className={styles.currentStatusOfMediumContainer}>
      <div className={styles.rechartsContainer}>
        <Recharts createVictoryBarData={createVictoryBarData} />
      </div>
      <div className={styles.tableContainer}>
        <Table reducedAllChannelDataArr={reducedAllChannelDataArr} CalculatingSumOfColumns={CalculatingSumOfColumns} />
      </div>
    </div>
  )
}

export default CurrentStatusOfMedium

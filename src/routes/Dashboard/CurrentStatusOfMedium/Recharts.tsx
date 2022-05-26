/* eslint-disable no-underscore-dangle */
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryStack,
  VictoryTheme,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from 'victory'

import styles from './currentStatusOfMedium.module.scss'
import { IVictoryBarData } from 'types/dashboard'

const Recharts = ({ createVictoryBarData }: { createVictoryBarData: Function }) => {
  const CHART_STYLE = {
    bar: {
      style: {
        data: { stroke: '#FFFFFF', strokeWidth: 0.3 },
        labels: { fontSize: 15 },
      },
      barWidth: 30,
      x: 'xAxis',
      y: 'yAxis',
      animate: {
        duration: 2000,
        onLoad: { duration: 1000 },
      },
    },
  }
  return (
    <div className={styles.rechartsWrapper}>
      <VictoryChart
        width={1300}
        height={400}
        domainPadding={{ x: [150, 150], y: 1 }}
        theme={VictoryTheme.material}
        containerComponent={
          <VictoryVoronoiContainer
            labels={({ datum }) => {
              let channel = ''
              if (datum._stack === 1) channel = 'google'
              if (datum._stack === 2) channel = 'facebook'
              if (datum._stack === 3) channel = 'naver'
              if (datum._stack === 4) channel = 'kakao'
              const value = createVictoryBarData(channel).filter((item: IVictoryBarData) => item.xAxis === datum.xName)
              return `${value[0].yAxis}%`
            }}
            labelComponent={
              <VictoryTooltip
                flyoutStyle={{
                  stroke: 'lightgray',
                  fill: 'white',
                }}
                flyoutPadding={15}
              />
            }
          />
        }
      >
        <VictoryAxis
          tickValues={['sales', 'cost', 'imp', 'click', 'convValue']}
          tickFormat={['매출', '광고비', '노출 수', '클릭 수', '전환 수']}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} />
        <VictoryStack colorScale={['#56adf7', '#85da47', '#ac8af8', '#f8d849']}>
          <VictoryBar {...CHART_STYLE.bar} data={createVictoryBarData('google')} />
          <VictoryBar {...CHART_STYLE.bar} data={createVictoryBarData('facebook')} />
          <VictoryBar {...CHART_STYLE.bar} cornerRadius={{ top: 6 }} data={createVictoryBarData('naver')} />
          <VictoryBar {...CHART_STYLE.bar} cornerRadius={{ top: 6 }} data={createVictoryBarData('kakao')} />
        </VictoryStack>
      </VictoryChart>
      <fieldset className={styles.rechartsLegendWrapper}>
        <div className={styles.textWrapper}>
          <div className={styles.circle} style={{ backgroundColor: 'rgb(79, 173, 247)' }} />
          <legend>구글</legend>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.circle} style={{ backgroundColor: 'rgb(133, 218, 71)' }} />
          <legend>페이스북</legend>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.circle} style={{ backgroundColor: 'rgb(172, 138, 248)' }} />
          <legend>네이버</legend>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.circle} style={{ backgroundColor: 'rgb(248, 216, 73)' }} />
          <legend>카카오</legend>
        </div>
      </fieldset>
    </div>
  )
}

export default Recharts

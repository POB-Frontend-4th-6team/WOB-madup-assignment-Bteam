import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme, VictoryVoronoiContainer } from 'victory'
import styles from './CurrentStatusOfMedium.module.scss'

const Recharts = ({ createVictoryBarData }: { createVictoryBarData: Function }) => {
  const CHART_STYLE = {
    bar: {
      style: {
        data: { stroke: '#FFFFFF', strokeWidth: 0.3 },
      },
      barWidth: 30,
      x: 'xAxis',
      y: 'yAxis',
      //   animate: { // 적용이 왜 안될까요,,, 달력을 클릭해야 모션이 생기네요
      //     duration: 2000,
      //     onLoad: { duration: 1000 },
      //   },
    },
  }
  return (
    <div className={styles.rechartsWrapper}>
      <VictoryChart width={1300} height={400} domainPadding={{ x: [150, 150], y: 1 }} theme={VictoryTheme.material}>
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
      <div className={styles.rechartsLegendWrapper}>
        <div className={styles.textWrapper}>
          <div className={styles.circle} style={{ backgroundColor: 'rgb(79, 173, 247)' }} />
          <span>구글</span>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.circle} style={{ backgroundColor: 'rgb(133, 218, 71)' }} />
          <span>페이스북</span>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.circle} style={{ backgroundColor: 'rgb(172, 138, 248)' }} />
          <span>네이버</span>
        </div>
        <div className={styles.textWrapper}>
          <div className={styles.circle} style={{ backgroundColor: 'rgb(248, 216, 73)' }} />
          <span>카카오</span>
        </div>
      </div>
    </div>
  )
}

export default Recharts

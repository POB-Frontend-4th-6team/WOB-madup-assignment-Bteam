import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme, VictoryVoronoiContainer } from 'victory'

import { useRecoilState } from 'hooks/state'
import { dailyDataResultState } from 'states/dashboard'

import styles from '../adStatus.module.scss'

type Data = {
  x: string
  y: number
}

interface Props {
  firstData: Data[] | undefined
  secondData: Data[] | undefined
}

const ChartItem = ({ firstData, secondData }: Props) => {
  const [dailyData] = useRecoilState(dailyDataResultState)

  const options = {
    width: 960,
    height: 400,
  }

  const getMaxNum = (d: Data[] | undefined) => {
    if (d && d.length > 0) return d?.reduce((max, p) => (p.y > max ? p.y : max), d[0].y)
    return -1
  }

  const maxima = (mNum: number) => {
    const strMaxNum = Math.floor(mNum).toString()
    const firstDigit = Number(strMaxNum.substring(0, 1)) + 1
    const square = 10 ** (strMaxNum.length - 1)

    return firstDigit * square
  }

  return (
    <div className={styles.chartContainer}>
      {dailyData.length !== 0 && (
        <VictoryChart
          theme={VictoryTheme.material}
          {...options}
          domain={{ y: [0, 1] }}
          containerComponent={<VictoryVoronoiContainer labels={({ datum }) => datum.y} />}
        >
          <VictoryAxis fixLabelOverlap />
          <VictoryAxis
            dependentAxis
            offsetX={50}
            tickLabelComponent={<VictoryLabel dy={15} textAnchor='start' />}
            style={{
              axis: { stroke: 'none' },
              tickLabels: { fill: 'black' },
            }}
            tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
            tickFormat={(t) => (t * maxima(getMaxNum(firstData))).toLocaleString()}
          />
          {secondData && (
            <VictoryAxis
              dependentAxis
              offsetX={910}
              tickLabelComponent={<VictoryLabel dy={15} dx={25} textAnchor='end' />}
              style={{
                axis: { stroke: 'none' },
                tickLabels: { fill: 'black' },
              }}
              tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
              tickFormat={(t) => (t * maxima(getMaxNum(secondData))).toLocaleString()}
            />
          )}
          <VictoryLine
            data={firstData}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            style={{
              parent: { border: '1px solid #ccc' },
              data: { stroke: '#4fadf7' },
            }}
            y={(datum) => datum.y / maxima(getMaxNum(firstData))}
          />
          {secondData && (
            <VictoryLine
              data={secondData}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              style={{
                parent: { border: '1px solid #ccc' },
                data: { stroke: '#85da47' },
              }}
              y={(datum) => datum.y / maxima(getMaxNum(secondData))}
            />
          )}
        </VictoryChart>
      )}
    </div>
  )
}

export default ChartItem

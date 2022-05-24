import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme } from 'victory'

import styles from './chart.module.scss'

type Data = {
  x: string
  y: number
}

interface Props {
  firstData?: Data[]
  secondData?: Data[]
}

const ChartItem = ({ firstData, secondData }: Props): JSX.Element => {
  const options = {
    width: 960,
    height: 400,
  }

  const maxNum = (d: Data[]) => {
    return d.reduce((max, p) => (p.y > max ? p.y : max), d[0].y)
  }

  const maxima = (mNum: number) => {
    const strMaxNum = Math.floor(mNum).toString()
    const firstDigit = Number(strMaxNum.substring(0, 1)) + 1
    const square = 10 ** (strMaxNum.length - 1)

    return firstDigit * square
  }

  const data = []

  if (firstData) {
    data[0] = firstData
  } else {
    data[0] = null
  }

  if (secondData) {
    data[1] = secondData
  } else {
    data[1] = null
  }

  const xOffsets = [50, 910]
  const colors = ['#4fadf7', '#85da47']

  return (
    <div className={styles.chartContainer}>
      {firstData && firstData.length !== 0 && (
        <VictoryChart theme={VictoryTheme.material} {...options} domain={{ y: [0, 1] }}>
          <VictoryAxis />
          {data?.map((d, i) => {
            if (d) {
              const key = `victoryAxis-${i}`
              return (
                <VictoryAxis
                  key={key}
                  dependentAxis
                  offsetX={xOffsets[i]}
                  tickLabelComponent={<VictoryLabel dy={15} textAnchor='start' />}
                  style={{
                    axis: { stroke: 'none' },
                    tickLabels: { fill: 'black' },
                  }}
                  tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
                  tickFormat={(t) => (t * maxima(maxNum(d))).toLocaleString()}
                />
              )
            }
            return null
          })}
          {data?.map((d, i) => {
            if (d) {
              const key = `victoryLine-${i}`
              return (
                <VictoryLine
                  key={key}
                  data={d}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 },
                  }}
                  style={{
                    parent: { border: '1px solid #ccc' },
                    data: { stroke: colors[i] },
                  }}
                  y={(datum) => datum.y / maxima(maxNum(d))}
                />
              )
            }
            return null
          })}
        </VictoryChart>
      )}
    </div>
  )
}

export default ChartItem

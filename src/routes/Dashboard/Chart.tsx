import { VictoryAxis, VictoryChart, VictoryLabel, VictoryLine, VictoryTheme } from 'victory'

import { IDailyData } from 'types/dashboard.d'
import { convertData } from './utils'

const data = [
  {
    imp: 51479,
    click: 559,
    cost: 371790,
    conv: 37,
    convValue: 3668610,
    ctr: 1.09,
    cvr: 6.62,
    cpc: 665.1,
    cpa: 10048.38,
    roas: 986.74,
    date: '2022-02-01',
  },
  {
    imp: 53385,
    click: 690,
    cost: 387181,
    conv: 34,
    convValue: 2870740,
    ctr: 1.29,
    cvr: 4.93,
    cpc: 561.13,
    cpa: 11387.68,
    roas: 741.45,
    date: '2022-02-02',
  },
  {
    imp: 71403,
    click: 693,
    cost: 407050,
    conv: 53,
    convValue: 3065225,
    ctr: 0.97,
    cvr: 7.65,
    cpc: 587.37,
    cpa: 7680.19,
    roas: 753.03,
    date: '2022-02-03',
  },
  {
    imp: 71010,
    click: 693,
    cost: 429057,
    conv: 50,
    convValue: 4190550,
    ctr: 0.98,
    cvr: 7.22,
    cpc: 619.13,
    cpa: 8581.14,
    roas: 976.69,
    date: '2022-02-04',
  },
]

type Data = {
  x: string
  y: number
}

const Graph = (): JSX.Element => {
  const { click, conv } = convertData(data as IDailyData[])

  const options = {
    width: 960,
    height: 400,
  }

  const maxNum = (d: Data[]) => {
    return d.reduce((max, p) => (p.y > max ? p.y : max), d[0].y)
  }

  const maxima = (mNum: number) => {
    // const maxVal = maxNum.reduce((max, p) => (p.y > max ? p.y : max), maxNum[0].y).toString()
    const strMaxNum = mNum.toString()
    const firstDigit = Number(strMaxNum.substring(0, 1)) + 1
    const squre = 10 ** (strMaxNum.length - 1)
    // const newArr = Array.from({ length: num }, (v, i) => (i + 1) * tmp)

    return firstDigit * squre
  }

  return (
    <div>
      <VictoryChart theme={VictoryTheme.material} {...options} domain={{ y: [0, 1] }}>
        <VictoryAxis />
        <VictoryAxis
          dependentAxis
          offsetX={50}
          tickLabelComponent={<VictoryLabel dy={15} textAnchor='start' />}
          style={{
            axis: { stroke: 'none' },
            tickLabels: { fill: 'black' },
          }}
          tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
          tickFormat={(t) => (t * maxima(maxNum(click))).toLocaleString()}
        />
        <VictoryAxis
          dependentAxis
          offsetX={910}
          tickLabelComponent={<VictoryLabel dy={15} textAnchor='start' />}
          style={{
            axis: { stroke: 'none' },
            tickLabels: { fill: 'black' },
          }}
          tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
          tickFormat={(t) => (t * maxima(maxNum(conv))).toLocaleString()}
        />
        <VictoryLine
          name='click'
          data={click}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          style={{
            parent: { border: '1px solid #ccc' },
          }}
          y={(datum) => datum.y / maxima(maxNum(click))}
        />
        <VictoryLine
          name='conv'
          data={conv}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          style={{
            data: { stroke: 'red' },
            parent: { border: '1px solid #ccc' },
          }}
          y={(datum) => datum.y / maxima(maxNum(conv))}
        />
      </VictoryChart>
    </div>
  )
}

export default Graph

import dayjs from 'dayjs'

import { IDailyData } from 'types/dashboard'

type Data = {
  x: string
  y: number
}

const getNewDate = (date: string) => {
  const year = Number(date.substring(0, 4))
  const month = Number(date.substring(5, 7)) - 1
  const day = Number(date.substring(8, 10))

  return new Date(year, month, day)
}

export const convertWeeklyData = (data: IDailyData[], startDateStr: string, endDateStr: string) => {
  const impWeekly: Data[] = []
  const clickWeekly: Data[] = []
  const costWeekly: Data[] = []
  const convWeekly: Data[] = []
  const roasWeekly: Data[] = []
  const salesWeekly: Data[] = []

  const startDate = getNewDate(startDateStr)
  const endDate = getNewDate(endDateStr)

  let tmpSum = { imp: 0, click: 0, cost: 0, conv: 0, roas: 0, sales: 0 }

  data.some((d) => {
    const tmpDate = getNewDate(d.date)
    let week

    const diffDate = startDate.getTime() - tmpDate.getTime()
    const dateDays = Math.abs(diffDate / (1000 * 3600 * 24))

    if (dateDays < 7) {
      week = 7 - dateDays
    } else if (tmpDate === endDate) {
      week = endDate.getDay()
    } else {
      week = 7
    }

    tmpSum.imp += d.imp
    tmpSum.click += d.click
    tmpSum.cost += d.cost
    tmpSum.conv += d.conv
    tmpSum.roas += d.roas
    tmpSum.sales += (d.roas * d.cost) / 100

    if (tmpDate.getDay() === 1 || d.date === endDateStr) {
      const tmpDateStr = dayjs(tmpDate).format('YYYY-MM-DD').toString()

      impWeekly.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.imp / week),
      })
      clickWeekly.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.click / week),
      })
      costWeekly.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.cost / week),
      })
      convWeekly.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.conv / week),
      })
      roasWeekly.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.roas / week),
      })
      salesWeekly.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.sales / week),
      })

      tmpSum = { imp: 0, click: 0, cost: 0, conv: 0, roas: 0, sales: 0 }
    }

    return getNewDate(d.date) > endDate
  })

  return {
    impWeekly,
    clickWeekly,
    costWeekly,
    convWeekly,
    roasWeekly,
    salesWeekly,
  }
}

export const convertDailyData = (data: IDailyData[]) => {
  const impDaily: Data[] = []
  const clickDaily: Data[] = []
  const costDaily: Data[] = []
  const convDaily: Data[] = []
  const roasDaily: Data[] = []
  const salesDaily: Data[] = []

  data.forEach((d) => {
    impDaily.push({
      x: d.date,
      y: d.imp,
    })
    clickDaily.push({
      x: d.date,
      y: d.click,
    })
    costDaily.push({
      x: d.date,
      y: d.cost,
    })
    convDaily.push({
      x: d.date,
      y: d.conv,
    })
    roasDaily.push({
      x: d.date,
      y: d.roas,
    })
    salesDaily.push({
      x: d.date,
      y: (d.roas * d.cost) / 100,
    })
  })

  return {
    impDaily,
    clickDaily,
    costDaily,
    convDaily,
    roasDaily,
    salesDaily,
  }
}

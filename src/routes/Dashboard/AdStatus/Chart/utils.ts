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
  const imp: Data[] = []
  const click: Data[] = []
  const cost: Data[] = []
  const conv: Data[] = []
  const roas: Data[] = []
  const sales: Data[] = []

  const startDate = getNewDate(startDateStr)
  const endDate = getNewDate(endDateStr)

  // const tmpDate = startDate
  let tmpSum = { imp: 0, click: 0, cost: 0, conv: 0, roas: 0, sales: 0 }

  data.some((d) => {
    const tmpDate = getNewDate(d.date)
    let week

    const diffDate = startDate.getTime() - tmpDate.getTime()
    const dateDays = Math.abs(diffDate / (1000 * 3600 * 24))

    if (dateDays < 7) {
      week = 7 - startDate.getDay()
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

      imp.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.imp / week),
      })
      click.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.click / week),
      })
      cost.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.cost / week),
      })
      conv.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.conv / week),
      })
      roas.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.roas / week),
      })
      sales.push({
        x: tmpDateStr,
        y: Math.round(tmpSum.sales / week),
      })

      tmpSum = { imp: 0, click: 0, cost: 0, conv: 0, roas: 0, sales: 0 }
    }

    return getNewDate(d.date) > endDate
  })

  return {
    imp,
    click,
    cost,
    conv,
    roas,
    sales,
  }
}

export const convertDailyData = (data: IDailyData[]) => {
  const imp: Data[] = []
  const click: Data[] = []
  const cost: Data[] = []
  const conv: Data[] = []
  const roas: Data[] = []
  const sales: Data[] = []

  data.forEach((d) => {
    imp.push({
      x: d.date,
      y: d.imp,
    })
    click.push({
      x: d.date,
      y: d.click,
    })
    cost.push({
      x: d.date,
      y: d.cost,
    })
    conv.push({
      x: d.date,
      y: d.conv,
    })
    roas.push({
      x: d.date,
      y: d.roas,
    })
    sales.push({
      x: d.date,
      y: (d.roas * d.cost) / 100,
    })
  })

  return {
    imp,
    click,
    cost,
    conv,
    roas,
    sales,
  }
}

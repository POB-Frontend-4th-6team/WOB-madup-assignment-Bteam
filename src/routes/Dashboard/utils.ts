import { IDailyData } from 'types/dashboard'

type Data = {
  x: string
  y: number
}

export const convertData = (data: IDailyData[]) => {
  const imp: Data[] = []
  const click: Data[] = []
  const cost: Data[] = []
  const conv: Data[] = []
  const convValue: Data[] = []
  const ctr: Data[] = []
  const cvr: Data[] = []
  const cpc: Data[] = []
  const cpa: Data[] = []
  const roas: Data[] = []

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
    convValue.push({
      x: d.date,
      y: d.convValue,
    })
    ctr.push({
      x: d.date,
      y: d.ctr,
    })
    cvr.push({
      x: d.date,
      y: d.cvr,
    })
    cpc.push({
      x: d.date,
      y: d.cpc,
    })
    cpa.push({
      x: d.date,
      y: d.cpa,
    })
    roas.push({
      x: d.date,
      y: d.roas,
    })
  })

  return {
    imp,
    click,
    cost,
    conv,
    convValue,
    ctr,
    cvr,
    cpc,
    cpa,
    roas,
  }
}

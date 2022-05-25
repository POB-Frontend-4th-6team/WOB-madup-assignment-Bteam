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

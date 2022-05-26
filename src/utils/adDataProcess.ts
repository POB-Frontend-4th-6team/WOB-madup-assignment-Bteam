import { ICardContentData, IDailyData, ISumAdData, IByChannelData } from 'types/dashboard'

export const dataProcess = (startDate: string, endDate: string, apiData: IDailyData[]) => {
  const sumCost = apiData?.map((item: IDailyData) => item.cost).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumImp = apiData?.map((item: IDailyData) => item.imp).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumClick = apiData?.map((item: IDailyData) => item.click).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumConv = apiData?.map((item: IDailyData) => item.conv).reduce((acc: number, cur: number) => acc + cur, 0)
  const sumSales = apiData
    ?.map((item: IDailyData) => (item.cost * item.roas) / 100)
    .reduce((acc: number, cur: number) => acc + cur, 0)
  let sumRoas
  if (sumSales === 0) {
    sumRoas = 0
  } else {
    sumRoas = (sumSales / sumCost) * 100
  }

  return {
    sumCost,
    sumImp,
    sumClick,
    sumConv,
    sumSales,
    sumRoas,
  }
}

export const channelDataProcess = (apiData: IByChannelData[], _channel: string) => {
  const fiteredDataAschannel = apiData?.filter((el: { channel: string }) => el.channel === _channel)
  const reducedAllDateChannelData = fiteredDataAschannel?.reduce((acc, cur, i) => {
    if (i === fiteredDataAschannel.length - 1) {
      return {
        sales: cur.sales + acc.sales,
        channel: cur.channel,
        cost: cur.cost + acc.cost,
        imp: cur.imp + acc.imp,
        click: cur.click + acc.click,
        convValue: cur.convValue + acc.convValue,
        ctr: (cur.ctr + acc.ctr) / fiteredDataAschannel.length,
        cpc: (cur.cpc + acc.cpc) / fiteredDataAschannel.length,
        roas: (cur.roas + acc.roas) / fiteredDataAschannel.length,
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
  return reducedAllDateChannelData
}

export const processCardData = (sumData: ISumAdData, prevSumData: ISumAdData) => {
  const roas = prevSumData.sumRoas - sumData.sumRoas
  const cost = prevSumData.sumCost - sumData.sumCost
  const imp = prevSumData.sumImp - sumData.sumImp
  const click = prevSumData.sumClick - sumData.sumClick
  const conv = prevSumData.sumConv - sumData.sumConv
  const sales = prevSumData.sumSales - sumData.sumSales

  const cardData: ICardContentData[] = [
    {
      title: 'ROAS',
      value: `${sumData.sumRoas.toFixed(2).toLocaleString()}%`,
      change: `${Math.abs(roas).toFixed(2).toLocaleString()}%`,
      increase: roas > 0,
    },
    {
      title: '광고비',
      value: `${sumData.sumCost.toLocaleString()}원`,
      change: `${Math.abs(cost).toLocaleString()}원`,
      increase: cost > 0,
    },
    {
      title: '노출 수',
      value: `${sumData.sumImp.toLocaleString()}회`,
      change: `${Math.abs(imp).toLocaleString()}회`,
      increase: imp > 0,
    },
    {
      title: '클릭수',
      value: `${sumData.sumClick.toLocaleString()}회`,
      change: `${Math.abs(click).toLocaleString()}회`,
      increase: click > 0,
    },
    {
      title: '전환 수',
      value: `${sumData.sumConv.toLocaleString()}회`,
      change: `${Math.abs(conv).toLocaleString()}회`,
      increase: conv > 0,
    },
    {
      title: '매출',
      value: `${Math.floor(sumData.sumSales).toLocaleString()}원`,
      change: `${Math.floor(Math.abs(sales)).toLocaleString()}원`,
      increase: sales > 0,
    },
  ]

  return cardData
}

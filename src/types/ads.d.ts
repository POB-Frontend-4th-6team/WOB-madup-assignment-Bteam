interface IAdsItem {
  id: number
  adType: string
  title: string
  budget: number
  status: string
  startDate: string
  endDate: string | null
  report: {
    cost: number
    convValue: number
    roas: number
  }
}

interface IAdsResponseAPI {
  count: number
  ads: IAdsItem[]
}

export { IAdsItem, IAdsResponseAPI }

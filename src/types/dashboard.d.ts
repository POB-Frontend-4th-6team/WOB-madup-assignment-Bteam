export interface IDailyData {
  imp: number
  click: number
  cost: number
  conv: number
  convValue: number
  ctr: number
  cpc: number
  cpa: number
  roas: number
  date: string
}

export interface IByChannelData {
  channel: string
  date: string
  imp: number
  click: number
  cost: number
  convValue: number
  ctr: number
  cvr: number
  cpc: number
  cpa: number
  roas: number
}
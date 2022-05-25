import { atom } from 'recoil'
import { IByChannelData, IDailyData } from 'types/dashboard'
import { InitialChannelData } from '../routes/Dashboard/dummyInitialData'

export const dailyDataResultState = atom<IDailyData[]>({
  key: '#dailyDataResultState',
  default: [],
})

export const byChannelDataResultState = atom<IByChannelData[]>({
  key: '#byChannelDataResultState',
  default: InitialChannelData.map((el: any) => {
    el.sales = (el.roas * el.cost) / 100
    return el
  }),
})

export const dailyFetchState = atom<boolean>({
  key: '#dailyFetchState',
  default: false,
})

export const byChannelFetchState = atom<boolean>({
  key: '#byChannelFetchState',
  default: false,
})

export const prevDailyDataResultState = atom<IDailyData[]>({
  key: '#prevdailyDataResultState',
  default: [],
})

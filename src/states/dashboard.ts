import { atom } from 'recoil'
import { IByChannelData, IDailyData } from 'types/dashboard'
import { getByChannelDefaultData } from 'services/ads'

export const dailyDataResultState = atom<IDailyData[]>({
  key: '#dailyDataResultState',
  default: [],
})

export const byChannelDataResultState = atom<IByChannelData[]>({
  key: '#byChannelDataResultState',
  default: getByChannelDefaultData('2022-02-01', '2022-02-02'),
})

export const dailyFetchState = atom<boolean>({
  key: '#dailyFetchState',
  default: false,
})
export const byChannelFetchState = atom<boolean>({
  key: '#byChannelFetchState',
  default: false,
})

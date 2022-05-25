import { AxiosResponse } from 'axios'

import { IAdsResponseAPI } from 'types/advertiseManage'
import { axios } from 'hooks/worker'
import { IDailyData, IByChannelData } from 'types/dashboard'

const DATA_URL = `http://localhost:3004/`

export const getAdsItemList = () =>
  axios.get<IAdsResponseAPI>(`${DATA_URL}adlist`).then((res) =>
    new Promise<AxiosResponse>((resolve) => {
      setTimeout(() => resolve(res), 2000)
    }).then((response: AxiosResponse) => response.data)
  )

export const getDailyData = (currentStartDate: string, currentEndDate: string) => {
  return axios.get<IDailyData[]>(`${DATA_URL}daily?date_gte=${currentStartDate}&date_lte=${currentEndDate}`)
}

export const getByChannelData = (currentStartDate: string, currentEndDate: string, setByChannelData: Function) => {
  return axios.get(`${DATA_URL}byChannel?date_gte=${currentStartDate}&date_lte=${currentEndDate}`).then((res) =>
    setByChannelData(
      res.data.map((el: IByChannelData) => {
        el.sales = (el.roas * el.cost) / 100
        return el
      })
    )
  )
}

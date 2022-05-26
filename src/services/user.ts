import { axios } from 'hooks/worker'
import { IUserProfileAPI } from 'types/user'

const USER_URL = 'http://localhost:3004/users/1'

export const getUserAPI = () => {
  return axios.get<IUserProfileAPI>(USER_URL).then((res) => res.data)
}

export const updateUserProfileAPI = (newData: string) => {
  return axios.patch(USER_URL, newData).then((res) => res.data)
}

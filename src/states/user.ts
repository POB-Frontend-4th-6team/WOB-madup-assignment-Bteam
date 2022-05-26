import { atom } from 'recoil'
import { IUserProfileAPI } from 'types/user'

export const currentUserState = atom<IUserProfileAPI>({
  key: '#currentUserState',
  default: {
    id: 0,
    name: '',
    email: '',
    services: [{ id: 0, title: '' }],
    marketingAgreed: '',
  },
})

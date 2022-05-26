export interface IUserProfileAPI {
  id: number
  name: string
  email: string
  services: IUserServices[]
  marketingAgreed: string
}

interface IUserServices {
  id: number
  title: string
}

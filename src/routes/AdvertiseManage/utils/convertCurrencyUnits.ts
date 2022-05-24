import { getDivide } from 'utils/num'

export const convertCurrencyUnits = (a: number) => {
  if (a >= 10000) {
    return Math.floor(getDivide(a, 10000))
  }
  if (a >= 1000) {
    return Math.floor(getDivide(a, 1000))
  }
  return a
}

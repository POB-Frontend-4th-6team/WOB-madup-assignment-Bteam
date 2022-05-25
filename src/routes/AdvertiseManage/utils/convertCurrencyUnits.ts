// export const convertCurrencyUnits = (a: number) => {
//   if (a >= 10000) {
//     return Math.floor(getDivide(a, 10000))
//   }
//   if (a >= 1000) {
//     return Math.floor(getDivide(a, 1000))
//   }
//   return a
// }

// 23,000 => 23천원
// 255,000 => 25만 3천원
// 2,555,000 => 255만 5천원
// 22,555,000 => 2255만 5천원
function numberFormat(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const convertCurrencyUnits2 = (number: number) => {
  if (number < 1000) return `${number}원`
  const inputNumber = number < 0 ? 0 : number
  const unitWords = ['', '만', '억', '조']
  const splitUnit = 10000
  const splitCount = unitWords.length
  const resultArray = []
  let resultString = ''
  let chon
  let won

  for (let i = 0; i < splitCount; i += 1) {
    let unitResult = (inputNumber % splitUnit ** (i + 1)) / splitUnit ** i
    // console.log(unitResult)
    unitResult = Math.floor(unitResult)
    if (i === 0) {
      won = unitResult % 1000 > 0 ? `${unitResult % 1000}원` : ''
      chon = Math.floor(unitResult / 1000) > 0 ? `${Math.floor(unitResult / 1000)}천` : ''
    } else if (unitResult > 0) {
      resultArray[i] = unitResult
    }
  }
  const a = `${chon}${won}`
  for (let i = 0; i < resultArray.length; i += 1) {
    if (resultArray[i]) resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString
  }

  return resultString + a
}

export const convertCurrencyUnits = (value: number) => {
  const thousands = Math.floor(value / 1000) - Math.floor(value / 10000) * 10
  if (value > 100000 && thousands === 0) return `${Math.floor(value / 10000)}만원`
  if (value > 100000) return `${Math.floor(value / 10000)}만${thousands}천원`
  if (value > 1000) return `${Math.floor(value / 1000)}천원`
  return `${value}원`
}

export const totalSales = (roas: number, cost: number) => {
  return (roas * cost) / 100
}

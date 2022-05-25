// export const convertCurrencyUnits = (a: number) => {
//   if (a >= 10000) {
//     return Math.floor(getDivide(a, 10000))
//   }
//   if (a >= 1000) {
//     return Math.floor(getDivide(a, 1000))
//   }
//   return a
// }

// TODO: 수정
function numberFormat(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const convertCurrencyUnits = (number: number) => {
  if (number <= 0) return '0원'
  const inputNumber = number
  const unitWords = ['', '만', '억', '조']
  const splitUnit = 10000
  const splitCount = unitWords.length
  const resultArray: number[] = []
  let resultString = ''
  let chon
  let won

  unitWords.forEach((value, index) => {
    let unitResult = (inputNumber % splitUnit ** (index + 1)) / splitUnit ** index
    unitResult = Math.floor(unitResult)
    if (index === 0) {
      won = unitResult % 1000 > 0 ? `${unitResult % 1000}원` : ''
      chon = Math.floor(unitResult / 1000) > 0 ? `${Math.floor(unitResult / 1000)}천` : ''
    } else if (unitResult > 0) {
      resultArray[index] = unitResult
    }
  })

  resultArray.forEach((value, index) => {
    if (resultArray[index]) resultString = String(numberFormat(resultArray[index])) + unitWords[index] + resultString
  })

  const a = `${chon}${won}`

  return resultString + a
}

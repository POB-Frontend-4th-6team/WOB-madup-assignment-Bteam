function numberFormat(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const convertValue = (number: number) => {
  if (number <= 0) return '0원'
  if (number < 1000) return `${number}원`

  const inputNumber = number
  const unitWords = ['', '만', '억', '조']
  const splitUnit = 10000
  const resultArray: number[] = []
  let resultString = ''
  let won

  unitWords.forEach((value, index) => {
    let unitResult = (inputNumber % splitUnit ** (index + 1)) / splitUnit ** index
    unitResult = Math.floor(unitResult)

    if (index === 0) {
      won = Math.floor(unitResult / 1000) > 0 ? `${Math.floor(unitResult / 1000)}천` : ''
    } else if (unitResult > 0) {
      resultArray[index] = unitResult
    }
  })

  resultArray.forEach((value, index) => {
    if (resultArray[index]) resultString = String(numberFormat(resultArray[index])) + unitWords[index] + resultString
  })

  const a = `${won}원`

  return resultString + a
}

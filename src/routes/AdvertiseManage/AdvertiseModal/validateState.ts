function validateTitle(value: string) {
  return value.length > 4
}

function validateBudget(value: string) {
  return /^\d+$/.test(value) && Number(value) >= 10
}

export { validateTitle, validateBudget }

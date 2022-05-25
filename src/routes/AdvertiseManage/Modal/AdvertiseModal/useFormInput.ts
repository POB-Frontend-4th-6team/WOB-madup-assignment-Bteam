import { ChangeEvent, MouseEvent, useState } from 'react'

interface IUseFormInputProps {
  validateFunction?: (value: string) => boolean
  initialValue: string
}

const useFormInput = ({ validateFunction, initialValue }: IUseFormInputProps) => {
  console.log('init : ', initialValue)
  const [value, setValue] = useState(initialValue)
  const [isTouched, setIsTouched] = useState(false)
  console.log('value : ', value)

  let valueIsValid = true
  if (validateFunction) valueIsValid = validateFunction(value)

  const hasError = !valueIsValid && isTouched

  const valueChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: currentValue } = e.currentTarget
    setValue(currentValue)
  }

  const valueClickHandler = (e: MouseEvent<HTMLInputElement>) => {
    const { value: currentValue } = e.currentTarget
    setValue(currentValue)
  }

  const inputBlurHandler = () => {
    setIsTouched(true)
  }

  const reset = () => {
    setValue(initialValue)
    setIsTouched(false)
  }

  return {
    value,
    setValue,
    hasError,
    valueChangeHandler,
    valueClickHandler,
    inputBlurHandler,
    reset,
  }
}

export default useFormInput

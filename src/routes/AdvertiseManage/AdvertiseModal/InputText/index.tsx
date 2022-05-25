import { InputCancelIcon } from 'assets/svgs'
import { ChangeEvent } from 'react'
import { cx } from 'styles'
import styles from './inputText.module.scss'

interface IInputFormProps {
  formTitle: string
  value: string
  onBlur: () => void
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  reset: () => void
  hasError: boolean
  errorText: string
}

const InputText = ({
  formTitle,
  value,
  onBlur,
  onChange,
  reset,
  hasError,
  errorText,
}: IInputFormProps): JSX.Element => {
  const handleResetOnclick = () => {
    console.log('reset')
    reset()
  }
  return (
    <div className={styles.inputForm}>
      <label htmlFor={formTitle} className={styles.formTitle}>
        {formTitle}
      </label>
      <input
        type='text'
        id={formTitle}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className={styles.inputText}
      />
      <InputCancelIcon className={cx({ [styles.iconHidden]: value === '' })} onClick={handleResetOnclick} />
      {hasError && <p className={styles.errorMessage}>{errorText}</p>}
    </div>
  )
}

export default InputText

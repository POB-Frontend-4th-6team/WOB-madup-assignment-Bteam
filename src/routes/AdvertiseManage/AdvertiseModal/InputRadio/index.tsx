import { MouseEvent } from 'react'
import styles from './inputRadio.module.scss'

interface IInputRadioProps {
  adType: string
  handleTypeClick: (e: MouseEvent<HTMLInputElement>) => void
}

const InputRadio = ({ adType, handleTypeClick }: IInputRadioProps): JSX.Element => {
  return (
    <div className={styles.inputForm}>
      <label htmlFor='type1' className={styles.radioTitle}>
        광고 유형
      </label>

      <div className={styles.inputRadio}>
        <input
          type='radio'
          id='type1'
          name='type'
          className={styles.radioInput}
          value='web'
          defaultChecked={adType === 'web'}
          onClick={handleTypeClick}
        />
        <label htmlFor='type1' className={styles.radioLabel}>
          웹사이트
        </label>

        <input
          type='radio'
          id='type2'
          name='type'
          className={styles.radioInput}
          value='app'
          defaultChecked={adType === 'app'}
          onClick={handleTypeClick}
        />
        <label htmlFor='type2' className={styles.radioLabel}>
          애플리케이션
        </label>
      </div>
    </div>
  )
}

export default InputRadio

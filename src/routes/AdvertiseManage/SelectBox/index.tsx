import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { cx } from 'styles'
import styles from './selectBox.module.scss'

interface ISelectBoxProps {
  selectList: string[]
  currentSelect: string
  setCurrentSelect: Dispatch<SetStateAction<string>>
}

const SelectBox = ({ selectList, currentSelect, setCurrentSelect }: ISelectBoxProps): JSX.Element => {
  const [openSelect, setOpenSelect] = useState(false)

  const handleVisibleOptions = () => {
    setOpenSelect((prev) => !prev)
  }

  const handleListClick = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedValue = e.currentTarget.dataset.value
    setCurrentSelect(selectedValue ?? selectList[0])
    setOpenSelect(false)
  }

  return (
    <div className={cx(styles.select, { [styles.openSelect]: openSelect })}>
      <button type='button' className={styles.selected} onClick={handleVisibleOptions}>
        <div className={styles.selectedValue}>{currentSelect}</div>
      </button>
      <ul>
        {selectList.map((value) => {
          return (
            <li className={styles.option} key={value}>
              <button type='button' data-value={value} onClick={handleListClick}>
                {value}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default SelectBox

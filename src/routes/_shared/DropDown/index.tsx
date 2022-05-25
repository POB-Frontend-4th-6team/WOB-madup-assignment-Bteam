import { DownArrow } from 'assets/svgs'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { Dispatch, MouseEvent, SetStateAction, useState } from 'react'
import { cx } from 'styles'
import styles from './dropDown.module.scss'

interface IDropDownProps {
  selectList: string[]
  currentSelect: string
  setCurrentSelect: Dispatch<SetStateAction<string>>
  size: 'large' | 'medium' | 'small'
}

const DropDown = ({ selectList, currentSelect, setCurrentSelect, size }: IDropDownProps): JSX.Element => {
  const [isOpenSelect, setIsOpenSelect] = useState(false)

  const handleVisibleOptions = () => {
    setIsOpenSelect((prev) => !prev)
  }

  const handleListClick = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedValue = e.currentTarget.dataset.value
    setCurrentSelect(selectedValue ?? selectList[0])
    setIsOpenSelect(false)
  }

  const handleOnClose = () => {
    setIsOpenSelect(false)
  }
  const dropDownRef = useOnClickOutside(handleOnClose)

  return (
    <div className={cx(styles.select, styles[size], { [styles.isOpenSelect]: isOpenSelect })} ref={dropDownRef}>
      <button type='button' className={cx(styles.selected, styles[size])} onClick={handleVisibleOptions}>
        {currentSelect}
        <DownArrow className={cx(styles.downArrowIcon, { [styles.selectMenuOpen]: isOpenSelect })} />
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

export default DropDown

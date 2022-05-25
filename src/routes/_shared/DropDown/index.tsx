import store from 'store'
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react'

import { useOnClickOutside } from 'hooks/useOnClickOutside'

import { DownArrow } from 'assets/svgs'
import { cx } from 'styles'
import styles from './dropDown.module.scss'

interface IDropDownProps {
  selectName: string
  selectList: string[]
  setCurrentSelect: Dispatch<SetStateAction<string>>
  size: 'large' | 'medium' | 'small'
}

const DropDown = ({ selectName, selectList, setCurrentSelect, size }: IDropDownProps): JSX.Element => {
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [isCategorySelect, setIsCategorySelect] = useState(false)
  const [categoryColor, setCategoryColor] = useState('')

  const displayedItem = store.get(selectName)

  if (!displayedItem) {
    store.set(selectName, selectList[0])
  }

  const handleVisibleOptions = () => {
    setIsOpenSelect((prev) => !prev)
  }

  const handleListClick = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedValue = e.currentTarget.dataset.value
    setCurrentSelect(selectedValue ?? selectList[0])
    setIsOpenSelect(false)
    store.set(selectName, selectedValue)
  }

  const handleOnClose = () => {
    setIsOpenSelect(false)
  }
  const dropDownRef = useOnClickOutside(handleOnClose)

  useEffect(() => {
    if (selectName === 'firstCategory' || selectName === 'secondCategory') {
      setIsCategorySelect(true)
      if (selectName === 'firstCategory') {
        setCategoryColor('#4fadf7')
      }
      if (selectName === 'secondCategory') {
        setCategoryColor('#85da47')
      }
    }
  }, [selectName])

  return (
    <div className={cx(styles.select, styles[size], { [styles.isOpenSelect]: isOpenSelect })} ref={dropDownRef}>
      <button type='button' className={cx(styles.selected, styles[size])} onClick={handleVisibleOptions}>
        {isCategorySelect && (
          <div className={styles.categoryIndicator} style={{ backgroundColor: `${categoryColor}` }} />
        )}
        {displayedItem}
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

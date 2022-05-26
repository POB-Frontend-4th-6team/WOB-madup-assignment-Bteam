import { useState } from 'react'
import store from 'store'

import { useOnClickOutside } from 'hooks/useOnClickOutside'

import { DownArrow, PlusIcon } from 'assets/svgs'
import { cx } from 'styles'
import styles from './serviceSelection.module.scss'

const MENU_TITLES = store.get('user')?.services || []

const ServiceSelection = () => {
  const [currentServiceTitle, setCurrentServiceTitle] = useState('매드업')
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)

  const handleToggleSelectMenu = () => {
    setIsDropDownOpen((prev) => !prev)
  }

  const handleMenuSelect = (e: React.MouseEvent<HTMLLIElement>) => {
    const selectedValue = e.currentTarget.dataset.value
    setCurrentServiceTitle(selectedValue ?? MENU_TITLES[0].title)
    setIsDropDownOpen(false)
  }

  const handleCloseDropDown = () => {
    setIsDropDownOpen(false)
  }

  const dropDownRef = useOnClickOutside(handleCloseDropDown)

  return (
    <section className={styles.serviceSelection}>
      <h6 className={styles.sideMenuTitle}>서비스</h6>
      <div className={styles.selectBox} ref={dropDownRef}>
        {currentServiceTitle}
        <DownArrow
          className={cx(styles.downArrowIcon, { [styles.selectMenuOpen]: isDropDownOpen })}
          onClick={handleToggleSelectMenu}
        />
        {isDropDownOpen && (
          <ul className={cx(styles.selectMenuList, { [styles.selectMenuListOpen]: isDropDownOpen })}>
            {MENU_TITLES?.map((menu: { id: number; title: string }) => (
              <li
                aria-selected
                role='option'
                key={`${menu.id}-${menu.title}`}
                data-value={menu.title}
                onClick={handleMenuSelect}
              >
                {menu.title}
              </li>
            ))}
            <li className={styles.addService}>
              서비스 추가
              <PlusIcon className={styles.addServiceIcon} />
            </li>
          </ul>
        )}
      </div>
    </section>
  )
}

export default ServiceSelection

import { DownArrow, LogoIcon, PlusIcon } from 'assets/svgs'
import cx from 'classnames'
import styles from './serviceSelection.module.scss'
import { useState } from 'react'

const MENU_TITLES = [
  { id: 1, title: '매드업' },
  { id: 2, title: '프리온보딩' },
]

const ServiceSelection = () => {
  const [currentServiceTitle, setCurrentServiceTitle] = useState('매드업')
  const [isSelectMenuOpen, setIsSelectMenuOpen] = useState(false)

  const handleToggleSelectMenu = () => {
    setIsSelectMenuOpen((prev) => !prev)
  }

  const handleMenuSelect = (title: string) => {
    setCurrentServiceTitle(title)
    setIsSelectMenuOpen(false)
  }

  return (
    <div className={styles.serviceSelection}>
      <h6 className={styles.sideMenuTitle}>서비스</h6>
      <div className={styles.selectBox}>
        {currentServiceTitle}
        <DownArrow
          className={cx(styles.downArrowIcon, { [styles.selectMenuOpen]: isSelectMenuOpen })}
          onClick={handleToggleSelectMenu}
        />
        {isSelectMenuOpen && (
          <ul className={styles.selectMenuList}>
            {MENU_TITLES.map((menu) => (
              <li
                role='menuitem'
                key={`${menu.id}-${menu.title}`}
                onClick={() => {
                  handleMenuSelect(menu.title)
                }}
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
    </div>
  )
}

export default ServiceSelection

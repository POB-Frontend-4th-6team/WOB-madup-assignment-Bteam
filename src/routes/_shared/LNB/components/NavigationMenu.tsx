import { AdListIcon, DashBoardIcon } from 'assets/svgs'
import { NavLink } from 'react-router-dom'
import { cx } from 'styles'
import styles from './navigationMenu.module.scss'

const NavigationMenu = () => {
  return (
    <nav className={styles.navigationContainer}>
      <h6 className={styles.navigationTitle}>광고 센터</h6>
      <ul className={styles.navigationList}>
        <NavLink to='/' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
          <li>
            <DashBoardIcon className={styles.navigationIcon} />
            대시보드
          </li>
        </NavLink>
        <NavLink to='advertise' className={({ isActive }) => cx({ [styles.isActive]: isActive })}>
          <li>
            <AdListIcon className={styles.navigationIcon} />
            광고관리
          </li>
        </NavLink>
      </ul>
    </nav>
  )
}

export default NavigationMenu

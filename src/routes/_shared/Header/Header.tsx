import { NotifyIcon, ProfileIcon, SettingIcon, MenuBar } from 'assets/svgs'
import { useRecoil } from 'hooks/state'

import { menuState } from 'states/adsItem'
import { cx } from 'styles'
import styles from './header.module.scss'

const Header = () => {
  const [sideMenuOpen, setSideMenuopen] = useRecoil(menuState)
  const handleOpenMenu = () => {
    setSideMenuopen((prev) => !prev)
  }

  return (
    <header className={styles.headerContainer}>
      <div>
        <button
          type='button'
          onClick={handleOpenMenu}
          className={cx(styles.meneOpenButton, { [styles.meneOpenClick]: sideMenuOpen })}
        >
          <MenuBar />
        </button>
      </div>
      <div>
        <NotifyIcon className={styles.notifyIcon} />
        <SettingIcon className={styles.settingIcon} />
        <div className={styles.profileContainer}>
          <ProfileIcon className={styles.profileIcon} />
          <button className={styles.userName} type='button'>
            원티드님
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

import { NotifyIcon, ProfileIcon, SettingIcon } from 'assets/svgs'
import styles from './header.module.scss'

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <NotifyIcon className={styles.notifyIcon} />
      <SettingIcon className={styles.settingIcon} />
      <div className={styles.profileContainer}>
        <ProfileIcon className={styles.profileIcon} />
        <button className={styles.userName} type='button'>
          원티드님
        </button>
      </div>
    </header>
  )
}

export default Header

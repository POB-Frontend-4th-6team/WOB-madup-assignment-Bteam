import { useQuery } from 'react-query'
import { NavLink } from 'react-router-dom'
import store from 'store'

import { useRecoil, useRecoilState } from 'hooks/state'
import { menuState } from 'states/adsItem'
import { getUserAPI } from 'services/user'
import { currentUserState } from 'states/user'

import { NotifyIcon, ProfileIcon, SettingIcon, MenuBar } from 'assets/svgs'
import { cx } from 'styles'
import styles from './header.module.scss'

const Header = () => {
  const [sideMenuOpen, setSideMenuOpen] = useRecoil(menuState)
  const [, setUser] = useRecoilState(currentUserState)

  useQuery(['profile'], getUserAPI, {
    onSuccess: (res) => {
      setUser(res)
      store.set('user', res)
    },
  })

  const name = store.get('user')?.name

  const handleOpenMenu = () => {
    setSideMenuOpen((prev) => !prev)
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
          <NavLink to='mypage'>
            <button className={styles.userName} type='button'>
              <span>{name}</span> 님
            </button>
          </NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header

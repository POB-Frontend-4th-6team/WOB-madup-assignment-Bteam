import { useEffect } from 'react'
import { debounce } from 'lodash'

import { useRecoil } from 'hooks/state'
import { menuState } from 'states/adsItem'

import { GuideIcon, LogoIcon } from 'assets/svgs'
import styles from './lnb.module.scss'
import ServiceSelection from './components/ServiceSelection'
import NavigationMenu from './components/NavigationMenu'
import { cx } from 'styles'
import { NavLink } from 'react-router-dom'

import { useOnClickOutside } from 'hooks/useOnClickOutside'

const LNB = () => {
  const [sideMenuOpen, setSideMenuOpen] = useRecoil(menuState)
  const LNBRef = useOnClickOutside(() => setSideMenuOpen(false))

  const handleResize = debounce(() => {
    if (window.innerWidth <= 768) setSideMenuOpen(false)
  }, 200)

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])

  return (
    <aside ref={LNBRef} className={cx(styles.lnbContainer, { [styles.lnbMobileOpen]: sideMenuOpen })}>
      <div className={styles.logoContainer}>
        <NavLink to='/'>
          <LogoIcon className={styles.logoIcon} />
        </NavLink>
      </div>

      <ServiceSelection />
      <NavigationMenu />
      <aside className={styles.linkToUsageGuide}>
        <GuideIcon />
        <button type='button' className={styles.usageGuide}>
          <h6>레버 이용 가이드</h6>
          <span>시작하기 전에 알아보기</span>
        </button>
      </aside>
      <aside className={styles.linkToTerms}>
        <h6>레버는 함께 만들어갑니다.</h6>
        <button type='button'>이용약관</button>
      </aside>
    </aside>
  )
}

export default LNB

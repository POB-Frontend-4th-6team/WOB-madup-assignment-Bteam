import { GuideIcon, LogoIcon } from 'assets/svgs'
import styles from './lnb.module.scss'
import ServiceSelection from './components/ServiceSelection'
import NavigationMenu from './components/NavigationMenu'
import { menuState } from 'states/adsItem'
import { useRecoil } from 'hooks/state'
import { cx } from 'styles'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { NavLink } from 'react-router-dom'

const LNB = () => {
  const [sideMenuOpen, setSideMenuopen] = useRecoil(menuState)
  const LNBRef = useOnClickOutside(() => setSideMenuopen(false))

  return (
    <aside ref={LNBRef} className={cx(styles.lnbContainer, { [styles.lnbMobileOpen]: sideMenuOpen })}>
      <NavLink to='/'>
        <div className={styles.logoContainer}>
          <LogoIcon className={styles.logoIcon} />
        </div>
      </NavLink>
      <ServiceSelection />
      <NavigationMenu />
      <aside className={styles.linkToUsageGuide}>
        <GuideIcon />
        <div className={styles.textArea}>
          <h6>레버 이용 가이드</h6>
          <span>시작하기 전에 알아보기</span>
        </div>
      </aside>
      <aside className={styles.linkToTerms}>
        <h6>레버는 함께 만들어갑니다.</h6>
        <button type='button'>이용약관</button>
      </aside>
    </aside>
  )
}

export default LNB

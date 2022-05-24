import { Outlet } from 'react-router-dom'

import Header from 'routes/_shared/Header'
import LNB from 'routes/_shared/LNB'

const Layout = () => {
  return (
    <>
      <LNB />
      <Header />
      <Outlet />
    </>
  )
}

export default Layout

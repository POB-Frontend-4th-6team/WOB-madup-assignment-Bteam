import { ReactNode } from 'react'
import styles from './container.module.scss'

interface IContainerProps {
  children: ReactNode
}

const Container = ({ children }: IContainerProps): JSX.Element => {
  return <div className={styles.container}>{children}</div>
}

export default Container

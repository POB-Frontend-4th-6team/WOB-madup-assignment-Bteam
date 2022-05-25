import { LoadingSpinner } from 'assets/svgs'
import styles from './loadingSpinner.module.scss'

const Loading = (): JSX.Element => {
  return (
    <div className={styles.loadingContainer}>
      <LoadingSpinner />
    </div>
  )
}

export default Loading

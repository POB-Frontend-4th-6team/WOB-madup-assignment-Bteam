import { DecreaseIcon, IncreaseIcon } from 'assets/svgs'
import styles from './dashboard.module.scss'

const AdTop = () => {
  const dummyData = [
    {
      title: 'ROAS',
      value: '00000',
      change: '00000',
      increase: true,
    },
    {
      title: '광고비',
      value: '00000',
      change: '00000',
      increase: false,
    },
    {
      title: '노출 수',
      value: '00000',
      change: '00000',
      increase: true,
    },
    {
      title: '클릭수',
      value: '00000',
      change: '00000',
      increase: true,
    },
    {
      title: '전환 수',
      value: '00000',
      change: '00000',
      increase: false,
    },
    {
      title: '매출',
      value: '00000',
      change: '00000',
      increase: true,
    },
  ]

  return (
    <ul className={styles.indicatorWrapper}>
      {dummyData.map((item) => (
        <li key={item.title} className={styles.indicatorCard}>
          <dl>
            <dt>{item.title}</dt>
            <dd>{item.value}</dd>
          </dl>
          <div className={styles.changeWrapper}>
            {item.increase ? <IncreaseIcon /> : <DecreaseIcon />}
            <span>{item.change}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default AdTop

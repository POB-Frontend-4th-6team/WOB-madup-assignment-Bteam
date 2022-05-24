import dayjs from 'dayjs'
import { IAdsItem } from 'types/ads'
import { getDivide, getMultiple } from 'utils/num'
import { convertCurrencyUnits } from '../utils/convertCurrencyUnits'
import styles from './contentCard.module.scss'

interface IContentCardProps {
  adsItem: IAdsItem
}

const ContentCard = ({ adsItem }: IContentCardProps): JSX.Element => {
  const adsTitle = adsItem.adType === 'web' ? `웹광고_${adsItem.title}` : `앱광고_${adsItem.title}`

  const adsStatus = adsItem.status === 'active' ? '진행중' : '종료'
  let adsCreatedAt = adsItem.endDate || adsItem.startDate
  adsCreatedAt = dayjs(adsCreatedAt).format('YYYY-MM-DD').toString()

  const adsBudget = convertCurrencyUnits(adsItem.budget).toLocaleString()
  const adsRoas = adsItem.report.roas

  let tempAdsSales = getMultiple(adsItem.report.roas, adsItem.report.cost)
  tempAdsSales = getDivide(tempAdsSales, 100)
  tempAdsSales = convertCurrencyUnits(tempAdsSales)
  const adsSales = tempAdsSales.toLocaleString()

  const adsCost = convertCurrencyUnits(adsItem.report.cost).toLocaleString()

  return (
    <article className={styles.card}>
      <header>
        <h3>{adsTitle}</h3>
      </header>
      <dl>
        <dt>상태</dt>
        <dd>{adsStatus}</dd>
      </dl>
      <dl>
        <dt>광고 생성일</dt>
        <dd>{adsCreatedAt}</dd>
      </dl>
      <dl>
        <dt>일 희망 예산</dt>
        <dd>{adsBudget}만원</dd>
      </dl>
      <dl>
        <dt>광고 수익률</dt>
        <dd>{adsRoas}%</dd>
      </dl>
      <dl>
        <dt>매출</dt>
        <dd>{adsSales}만원</dd>
      </dl>
      <dl>
        <dt>광고 비용</dt>
        <dd>{adsCost}만원</dd>
      </dl>
      <button type='button'>수정하기</button>
    </article>
  )
}

export default ContentCard

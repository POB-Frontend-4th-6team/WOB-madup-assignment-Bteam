import dayjs from 'dayjs'
import { MouseEvent } from 'react'
import { IAdsItem } from 'types/advertiseManage'
import { convertCurrencyUnits } from './convertCurrencyUnits'
import styles from './contentCard.module.scss'

interface IContentCardProps {
  adsItem: IAdsItem
  handleOpenModal: (e: MouseEvent<HTMLButtonElement>) => void
}

const ContentCard = ({ adsItem, handleOpenModal }: IContentCardProps): JSX.Element => {
  // TODO: bignumber 제거, 정리
  const adsTitle = adsItem.adType === 'web' ? `웹광고_${adsItem.title}` : `앱광고_${adsItem.title}`

  const adsStatus = adsItem.status === 'active' ? '진행중' : '종료'
  const startDate = dayjs(adsItem.startDate).format('YYYY-MM-DD')
  const endDate = adsItem.endDate && dayjs(adsItem.endDate).format('YYYY-MM-DD')
  const adsCreatedAt = endDate ? `${startDate} (${endDate})` : startDate

  const adsBudget = convertCurrencyUnits(adsItem.budget).toLocaleString()
  const adsRoas = adsItem.report.roas.toLocaleString()
  // roas * 광고비 / 100
  const tempAdsSales = (adsItem.report.roas * adsItem.report.cost) / 100
  const adsSales = convertCurrencyUnits(tempAdsSales) ?? 0
  // /const adsSales = tempAdsSales.toLocaleString()

  const adsCost = convertCurrencyUnits(adsItem.report.cost) ?? 0

  // TODO: 단위 맞음?
  return (
    <article className={styles.card}>
      <header>
        <h3>{adsTitle}</h3>
      </header>
      <dl>
        <div>
          <dt>상태</dt>
          <dd>{adsStatus}</dd>
        </div>
        <div>
          <dt>광고 생성일</dt>
          <dd>{adsCreatedAt}</dd>
        </div>
        <div>
          <dt>일 희망 예산</dt>
          <dd>{adsBudget}</dd>
        </div>
        <div>
          <dt>광고 수익률</dt>
          <dd>{adsRoas}%</dd>
        </div>
        <div>
          <dt>매출</dt>
          <dd>{adsSales}</dd>
        </div>
        <div>
          <dt>광고 비용</dt>
          <dd>{adsCost}</dd>
        </div>
      </dl>
      <button type='button' data-item={JSON.stringify(adsItem)} onClick={handleOpenModal}>
        수정하기
      </button>
    </article>
  )
}

export default ContentCard

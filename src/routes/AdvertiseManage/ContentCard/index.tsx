import dayjs from 'dayjs'
import store from 'store'
import { MouseEvent } from 'react'

import { IAdsItem } from 'types/advertiseManage'
import { convertValue } from './convertValue'
import styles from './contentCard.module.scss'
import { Trash } from 'assets/svgs'
import { useRecoil } from 'hooks/state'
import { adsListState } from 'states/adsItem'
import { deleteAdsItemListAPI } from 'services/ads'

interface IContentCardProps {
  adsItem: IAdsItem
  handleOpenModal: (e: MouseEvent<HTMLButtonElement>) => void
}

const ContentCard = ({ adsItem, handleOpenModal }: IContentCardProps): JSX.Element => {
  const adsTitle = adsItem.adType === 'web' ? `웹광고_${adsItem.title}` : `앱광고_${adsItem.title}`
  const adsStatus = adsItem.status === 'active' ? '진행중' : '종료'

  const startDate = dayjs(adsItem.startDate).format('YYYY-MM-DD')
  const endDate = adsItem.endDate && dayjs(adsItem.endDate).format('YYYY-MM-DD')
  const adsCreatedAt = endDate ? `${startDate} (${endDate})` : startDate
  const adsRoas = adsItem.report.roas.toLocaleString()

  const tempAdsSales = (adsItem.report.roas * adsItem.report.cost) / 100
  const adsSales = convertValue(tempAdsSales)
  const adsBudget = convertValue(adsItem.budget)
  const adsCost = convertValue(adsItem.report.cost)

  const [, setAdsList] = useRecoil(adsListState)

  const handleRemoveItem = () => {
    deleteAdsItemListAPI(adsItem.id).then(() => {
      setAdsList((prev) => {
        const temp = prev.filter((value) => value.id !== adsItem.id)
        store.remove('adsList')
        store.set('adsList', temp)
        return temp
      })
    })
  }

  return (
    <li className={styles.card}>
      <h3 className={styles.header}>
        <div className={styles.title}>{adsTitle}</div>
        <button type='button' className={styles.trashButton} onClick={handleRemoveItem}>
          <Trash />
        </button>
      </h3>

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
      <button
        type='button'
        data-item={JSON.stringify(adsItem)}
        onClick={handleOpenModal}
        className={styles.updateButton}
      >
        수정하기
      </button>
    </li>
  )
}

export default ContentCard

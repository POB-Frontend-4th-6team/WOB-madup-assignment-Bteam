import { Suspense, useEffect, useState } from 'react'

import ContentCard from './ContentCard'
import SelectBox from './SelectBox'
import styles from './advertiseManage.module.scss'
import { useQuery } from 'react-query'
import { useRecoil } from 'hooks/state'
import { adsListState } from 'states/adsItem'
import { getAdsItemList } from 'services/ads'
import { IAdsItem } from 'types/ads'
import { filterAdsItems } from './utils/filterAdsItems'
import Modal from './Modal'

const SELECT_LIST = ['전체 광고', '진행 광고', '중지 광고']

const AdvertiseManage = (): JSX.Element => {
  const [currentSelect, setCurrentSelect] = useState(SELECT_LIST[0])
  const [adsList, setAdsList] = useRecoil(adsListState)
  const [visibleModal, setVisibleModal] = useState(false)

  const { isLoading, data } = useQuery(
    ['getAdsList'],
    () =>
      getAdsItemList().then((res): IAdsItem[] => {
        return res.data.ads
      }),
    {
      staleTime: 6 * 50 * 1000,
      useErrorBoundary: true,
      suspense: true,
      select: (value): IAdsItem[] => {
        // TODO: end_date가 있고 오늘 날짜 보다 이전이면 status를 ended로 변경하기
        // TODO: store 저장
        if (!value.length) return []
        return value
      },
    }
  )

  console.log(adsList, isLoading, data)

  useEffect(() => {
    if (data && data.length > 0) {
      setAdsList(data)
    }
  }, [data, setAdsList])

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <SelectBox selectList={SELECT_LIST} setCurrentSelect={setCurrentSelect} currentSelect={currentSelect} />

        <button type='button' className={styles.headerButton} onClick={() => setVisibleModal(true)}>
          광고 만들기
        </button>
      </header>

      <main className={styles.cardWrapper}>
        <div className={styles.cards}>
          <Suspense fallback={<div>Loading...</div>}>
            {adsList
              .filter((value) => filterAdsItems(value, currentSelect))
              .map((value) => {
                return <ContentCard key={value.id} adsItem={value} />
              })}
          </Suspense>
        </div>
      </main>
      <Modal
        openModal={visibleModal}
        onCancel={() => {
          setVisibleModal(false)
        }}
        onConfirm={() => {
          setVisibleModal(false)
        }}
      />
    </main>
  )
}

export default AdvertiseManage

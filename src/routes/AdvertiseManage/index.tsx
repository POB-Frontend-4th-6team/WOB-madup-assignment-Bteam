import { MouseEvent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import store from 'store'
import _ from 'lodash'

import { IAdsItem } from 'types/advertiseManage'
import { useRecoil } from 'hooks/state'
import { adsListState } from 'states/adsItem'
import { getAdsItemList } from 'services/ads'

import ContentCard from './ContentCard'
import styles from './advertiseManage.module.scss'
import AdvertiseModal from './Modal/AdvertiseModal/AdvertiseModal'
import Container from 'routes/_shared/Container'
import DropDown from 'routes/_shared/DropDown'
import Loading from 'routes/_shared/Loading'
import { filterAdsItems } from './utils/filterAdsItems'

const SELECT_LIST = ['전체 광고', '진행 광고', '중지 광고']

const AdvertiseManage = (): JSX.Element => {
  const [currentSelect, setCurrentSelect] = useState(SELECT_LIST[0])
  const [adsList, setAdsList] = useRecoil(adsListState)
  const [visibleModal, setVisibleModal] = useState(false)
  const [selectedAdItem, setSelectedAdItem] = useState<IAdsItem | null>(null)

  // TODO: 분리
  const { isLoading, data } = useQuery(
    ['getAdsList'],
    () =>
      getAdsItemList().then((res): IAdsItem[] => {
        return res.data.ads
      }),
    {
      staleTime: 6 * 50 * 1000,
      useErrorBoundary: true,
      select: (value): IAdsItem[] => {
        // TODO: end_date가 있고 오늘 날짜 보다 이전이면 status를 ended로 변경하기
        // TODO: store 저장
        if (!value.length) return []
        return value
      },
    }
  )

  // console.log(adsList, isLoading, data)

  useEffect(() => {
    if (data && data.length > 0) {
      // TODO: 여기서 store?
      const adsLocalList = store.get('ads_list')
      if (adsLocalList?.length > 0) {
        let tempAds = adsLocalList.concat(data)
        tempAds = _.uniqBy(tempAds, 'id')
        store.set('ads_list', tempAds)
        setAdsList(tempAds)
        return
      }

      store.set('ads_list', data)
      setAdsList(data)
    }
  }, [data, setAdsList])

  const handleOpenModal = (e: MouseEvent<HTMLButtonElement>) => {
    const tempItem = e.currentTarget.dataset.item ?? ''

    const adItem = tempItem !== '' ? JSON.parse(tempItem) : ''
    setSelectedAdItem(adItem || null)
    setVisibleModal(true)
  }

  return (
    <main className={styles.main}>
      <header className={styles.mainHeader}>
        <h2>광고관리</h2>
      </header>
      <Container>
        <header className={styles.containerHeader}>
          <DropDown
            size='medium'
            selectList={SELECT_LIST}
            setCurrentSelect={setCurrentSelect}
            currentSelect={currentSelect}
          />

          <button type='button' className={styles.headerButton} onClick={handleOpenModal}>
            광고 만들기
          </button>
        </header>

        {isLoading && <Loading />}
        <div className={styles.cards}>
          {adsList
            .filter((value) => filterAdsItems(value, currentSelect))
            .sort((a, b) => b.id - a.id)
            .map((value) => {
              return <ContentCard key={value.id} adsItem={value} handleOpenModal={handleOpenModal} />
            })}
        </div>

        {visibleModal && (
          <AdvertiseModal openModal={visibleModal} selectedAdItem={selectedAdItem} setVisibleModal={setVisibleModal} />
        )}
      </Container>
    </main>
  )
}

export default AdvertiseManage

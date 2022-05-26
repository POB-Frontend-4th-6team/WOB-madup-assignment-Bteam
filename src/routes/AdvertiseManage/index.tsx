import { MouseEvent, useEffect, useState } from 'react'
import store from 'store'
import _ from 'lodash'

import { IAdsItem } from 'types/advertiseManage'
import { useRecoil } from 'hooks/state'
import { adsListState } from 'states/adsItem'

import ContentCard from './ContentCard'
import AdvertiseModal from './AdvertiseModal'
import Container from 'routes/_shared/Container'
import DropDown from 'routes/_shared/DropDown'
import Loading from 'routes/_shared/Loading'
import styles from './advertiseManage.module.scss'
import { useGetAdsList } from './utils/useGetAdsList'
import { filterAdsItems } from './utils/filterAdsItems'

const SELECT_LIST = ['전체 광고', '진행 광고', '중지 광고']

const AdvertiseManage = (): JSX.Element => {
  const [currentSelect, setCurrentSelect] = useState(SELECT_LIST[0])
  const [adsList, setAdsList] = useRecoil(adsListState)
  const [visibleModal, setVisibleModal] = useState(false)
  const [selectedAdItem, setSelectedAdItem] = useState<IAdsItem | null>(null)

  const { data, isLoading } = useGetAdsList()

  useEffect(() => {
    const localStatus = store.get('adsStatus')
    if (localStatus) setCurrentSelect(localStatus)
    if (data && data.length > 0) {
      const adsLocalList = store.get('adsList')
      if (adsLocalList?.length > 0) {
        let tempAds = adsLocalList.concat(data)
        tempAds = _.uniqBy(tempAds, 'id')
        store.set('adsList', tempAds)
        setAdsList(tempAds)
        return
      }

      store.set('adsList', data)
      setAdsList(data)
    }
  }, [data, setAdsList, currentSelect])

  const handleOpenModal = (e: MouseEvent<HTMLButtonElement>) => {
    const tempItem = e.currentTarget.dataset.item ?? ''
    const adItem = tempItem === '' ? '' : JSON.parse(tempItem)
    setSelectedAdItem(adItem || null)
    setVisibleModal(true)
  }

  const Cards = adsList
    .filter((value) => filterAdsItems(value, currentSelect))
    .map((value) => {
      return <ContentCard key={value.id} adsItem={value} handleOpenModal={handleOpenModal} />
    })

  return (
    <main className={styles.main}>
      <header className={styles.mainHeader}>
        <h2>광고관리</h2>
      </header>
      <Container>
        <div className={styles.containerHeader}>
          <DropDown selectName='adsStatus' size='medium' selectList={SELECT_LIST} setCurrentSelect={setCurrentSelect} />

          <button type='button' className={styles.headerButton} onClick={handleOpenModal}>
            광고 만들기
          </button>
        </div>

        {isLoading && <Loading />}

        <ul className={styles.cards}>{Cards}</ul>

        {visibleModal && <AdvertiseModal selectedAdItem={selectedAdItem} setVisibleModal={setVisibleModal} />}
      </Container>
    </main>
  )
}

export default AdvertiseManage

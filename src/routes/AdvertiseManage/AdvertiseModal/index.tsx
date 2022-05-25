import { Dispatch, FormEvent, SetStateAction } from 'react'
import dayjs from 'dayjs'

import { IAdsItem } from 'types/advertiseManage'
import { useRecoil } from 'hooks/state'
import { adsListState } from 'states/adsItem'

import Modal from './ModalPortal'
import InputText from './InputText'
import InputRadio from './InputRadio'
import useFormInput from './useFormInput'
import { validateBudget, validateTitle } from './validateState'
import { updateAdvertiseList } from './updateAdvertiseList'
import { CloseIcon } from 'assets/svgs/index'
import styles from './advertiseModal.module.scss'
import { addPutAdsItemAPI } from 'services/ads'

interface IAdsModalProps {
  selectedAdItem: IAdsItem | null
  setVisibleModal: Dispatch<SetStateAction<boolean>>
}

const AdvertiseModal = ({ selectedAdItem, setVisibleModal }: IAdsModalProps): JSX.Element => {
  const isAdd = !selectedAdItem?.id

  const [advertiseList, setAdvertiseList] = useRecoil(adsListState)

  const {
    value: adType,
    setValue: setAdType,
    valueClickHandler: handleTypeClick,
  } = useFormInput({ initialValue: selectedAdItem?.adType ?? 'web' })

  const {
    value: title,
    reset: resetTitle,
    valueIsValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: handleTitleChange,
    inputBlurHandler: handleTitleBlur,
  } = useFormInput({ validateFunction: validateTitle, initialValue: selectedAdItem?.title ?? '' })

  const {
    value: budget,
    reset: resetBudget,
    valueIsValid: budgetIsValid,
    hasError: budgetHasError,
    valueChangeHandler: handleBudgetChange,
    inputBlurHandler: handleBudgetBlur,
  } = useFormInput({ validateFunction: validateBudget, initialValue: selectedAdItem?.budget.toString() || '' })

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!titleIsValid || !budgetIsValid) {
      handleTitleBlur()
      handleBudgetBlur()
      return
    }

    const tempAdItem = {
      id: selectedAdItem?.id || advertiseList[advertiseList.length - 1].id + 1,
      adType,
      title,
      budget: Number(budget),
      status: selectedAdItem?.status ? selectedAdItem?.status : 'active',
      startDate: dayjs(new Date()).toString(),
      endDate: null,
      report: { cost: 0, convValue: 0, roas: 0 },
    }

    addPutAdsItemAPI(tempAdItem, isAdd)
      .then(() => {
        setAdvertiseList((prev) => {
          const newList = updateAdvertiseList({ prevList: prev, tempAdItem })
          return newList
        })
      })
      .finally(() => {
        setVisibleModal(false)
      })
  }

  const onCancel = () => {
    setAdType('web')
    resetTitle()
    resetBudget()
    setVisibleModal(false)
  }

  return (
    <Modal onCancel={onCancel}>
      <header className={styles.header}>
        <h3 className={styles.title}>{isAdd ? '생성' : '수정'}할 광고 유형을 선택하세요.</h3>
        <button type='button' onClick={onCancel} className={styles.cancelButton}>
          <CloseIcon />
        </button>
      </header>
      <div className={styles.content}>
        <form onSubmit={handleOnSubmit}>
          <InputRadio adType={adType} handleTypeClick={handleTypeClick} />
          <InputText
            formTitle='광고명'
            value={title}
            onChange={handleTitleChange}
            reset={resetTitle}
            onBlur={handleTitleBlur}
            hasError={titleHasError}
            errorText='광고명은 5글자 이상이어야 합니다.'
          />

          <InputText
            formTitle='일 희망 예산'
            value={budget}
            onChange={handleBudgetChange}
            reset={resetBudget}
            onBlur={handleBudgetBlur}
            hasError={budgetHasError}
            errorText='10 이상의 숫자만 입력하세요.'
          />

          <footer className={styles.footer}>
            <button type='button' onClick={onCancel} className={styles.cancelButton}>
              취소
            </button>
            <button type='submit' className={styles.confirmButton}>
              확인
            </button>
          </footer>
        </form>
      </div>
    </Modal>
  )
}

export default AdvertiseModal

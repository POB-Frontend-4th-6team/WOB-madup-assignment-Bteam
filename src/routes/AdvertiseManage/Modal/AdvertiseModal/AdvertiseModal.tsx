import { Dispatch, FormEvent, SetStateAction } from 'react'

import { IAdsItem } from 'types/advertiseManage'
import useFormInput from './useFormInput'
import { CloseIcon, InputCancelIcon } from 'assets/svgs/index'

import Modal from '..'
import { cx } from 'styles'
import styles from './advertiseModal.module.scss'
import dayjs from 'dayjs'
import { updateAdvertiseList } from './updateAdvertiseList'
import { validateBudget, validateTitle } from './validateState'
import { useRecoil } from 'hooks/state'
import { adsListState } from 'states/adsItem'

interface IAdsModalProps {
  selectedAdItem: IAdsItem | null
  openModal: boolean
  setVisibleModal: Dispatch<SetStateAction<boolean>>
}

const AdvertiseModal = ({ selectedAdItem, setVisibleModal, openModal }: IAdsModalProps): JSX.Element => {
  const [advertiseList, setAdvertiseList] = useRecoil(adsListState)
  const {
    value: adType,
    reset: resetAdType,
    valueClickHandler: typeClickHandler,
  } = useFormInput({ initialValue: selectedAdItem?.adType ?? 'web' })

  const {
    value: title,
    hasError: titleHasError,
    reset: resetTitle,
    valueIsValid: titleIsValid,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: handleTitleBlur,
  } = useFormInput({ validateFunction: validateTitle, initialValue: selectedAdItem?.title ?? '' })

  const {
    value: budget,
    hasError: budgetIsError,
    reset: resetBudget,
    valueIsValid: budgetIsValid,
    valueChangeHandler: handleBudgetChange,
    inputBlurHandler: handleBudgetBlur,
  } = useFormInput({ validateFunction: validateBudget, initialValue: selectedAdItem?.budget.toString() || '' })

  const handleOnSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!titleIsValid || !budgetIsValid) return

    const tempAdItem = {
      id: selectedAdItem?.id ? selectedAdItem?.id : advertiseList[advertiseList.length - 1].id + 1,
      adType,
      title,
      budget: Number(budget),
      status: selectedAdItem?.status ? selectedAdItem?.status : 'active',
      startDate: dayjs(new Date()).toString(),
      endDate: null,
      report: { cost: 0, convValue: 0, roas: 0 },
    }

    setAdvertiseList((prev) => {
      const newList = updateAdvertiseList({ prevList: prev, tempAdItem })
      return newList
    })
    setVisibleModal(false)
  }

  const onCancel = () => {
    resetAdType()
    resetTitle()
    resetBudget()
    setVisibleModal(false)
  }

  return (
    <Modal onCancel={onCancel} openModal={openModal}>
      <header className={styles.header}>
        <h3>생성할 광고 유형을 선택하세요.</h3>
        <button type='button' onClick={onCancel} className={styles.cancelButton}>
          <CloseIcon />
        </button>
      </header>

      <div className={styles.content}>
        <form onSubmit={handleOnSubmit}>
          <div className={styles.inputForm}>
            {/* // TODO: feild */}
            <legend>광고 유형</legend>
            <div className={styles.inputRadio}>
              <input
                type='radio'
                id='type1'
                name='type'
                className={styles.radioInput}
                value='web'
                defaultChecked={adType === 'web'}
                onClick={typeClickHandler}
              />
              <label htmlFor='type1' className={styles.radioLabel}>
                웹사이트
              </label>
              <input
                type='radio'
                id='type2'
                name='type'
                className={styles.radioInput}
                value='app'
                defaultChecked={adType === 'app'}
                onClick={typeClickHandler}
              />
              <label htmlFor='type2' className={styles.radioLabel}>
                애플리케이션
              </label>
            </div>
          </div>

          <div className={styles.inputForm}>
            <label htmlFor='name'>광고명</label>
            <input
              type='text'
              id='name'
              value={title}
              onBlur={handleTitleBlur}
              onChange={titleChangeHandler}
              className={styles.titleInput}
            />
            {/* TODO: 아이콘 버튼으로 감싸고 RESET */}
            <InputCancelIcon className={cx({ [styles.iconHidden]: title === '' })} />
            {titleHasError && <p className={styles.errorMessage}>광고명은 5글자 이상이어야 합니다.</p>}
          </div>

          <div className={styles.inputForm}>
            <label htmlFor='budget'>일 희망 예산</label>
            <input
              type='text'
              pattern='[0-9]*'
              name='budget'
              placeholder='0'
              value={budget}
              onBlur={handleBudgetBlur}
              onChange={handleBudgetChange}
              className={styles.budgetInput}
            />
            <InputCancelIcon className={cx({ [styles.iconHidden]: budget === '' })} />
            {budgetIsError && <p className={styles.errorMessage}>10 이상의 숫자만 입력하세요.</p>}
          </div>

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

import { MouseEvent, MouseEventHandler } from 'react'
import ReactDOM from 'react-dom'

import defaultImg from 'assets/defaultImg.png'
import styles from './Modal.module.scss'
import { IAdsItem } from 'types/ads'
import { cx } from 'styles'
// import { IMovieItem } from 'types/movie'
// import useFavoriteUpdate from 'hooks/favoriteUpdate'

interface IBackDropProps {
  openModal: boolean
  onCancel: MouseEventHandler<HTMLButtonElement>
}

interface IModalProps {
  openModal: boolean
  onCancel: MouseEventHandler<HTMLButtonElement>
  onConfirm: MouseEventHandler<HTMLButtonElement>
}

const BackDrop = ({ openModal, onCancel }: IBackDropProps) => {
  return (
    <button
      type='button'
      onClick={onCancel}
      className={cx(styles.backDropButton, { [styles.backDropHidden]: !openModal })}
    >
      <div className={styles.backDrop} />
    </button>
  )
}

const ModalOverlay = ({ openModal, onCancel, onConfirm }: IModalProps) => {
  // const handleImgOnError = (e: MouseEvent<HTMLImageElement>) => {
  //   e.currentTarget.src = defaultImg
  // }

  // const { removeFromFavorite, addToFavorite } = useFavoriteUpdate({
  //   selectedMovie: movie,
  // })

  // const handleRemoveFavorite = (e: MouseEvent<HTMLButtonElement>) => {
  //   removeFromFavorite()
  //   onCancel(e)
  // }

  // const handleAddFavorite = (e: MouseEvent<HTMLButtonElement>) => {
  //   addToFavorite()
  //   onCancel(e)
  // }

  // const makeClickButton = () => {
  //   let onClick = handleAddFavorite
  //   let content = '추가'
  //   if (isRemove) {
  //     onClick = handleRemoveFavorite
  //     content = '제거'
  //   }

  //   return (
  //     <button type='button' onClick={onClick}>
  //       {content}
  //     </button>
  //   )
  // }

  // const clickButton = makeClickButton()

  return (
    <div className={cx(styles.modal, { [styles.modalHidden]: !openModal })}>
      <div className={styles.modalActive}>
        <header className={styles.header}>
          <h3>생성할 광고 유형을 선택하세요.</h3>
          <button type='button' onClick={onCancel}>
            X
          </button>
        </header>
        <div className={styles.content}>
          <form>
            <div>
              <label htmlFor='type'>광고 유형</label>
              <input type='checkbox' name='type' value={1} />
              <input type='checkbox' name='type' value={2} />
              <input type='checkbox' name='type' value={3} />
            </div>
            <div>
              <label htmlFor='url'>웹사이트 주소(URL)</label>
              <input type='text' id='url' />
            </div>
            <div>
              <label htmlFor='name'>광고명</label>
              <input type='text' id='name' />
            </div>
            <div>
              <label htmlFor='type'>광고 목표</label>
              <label>
                <input type='checkbox' name='purpose' value={1} />
                웹사이트 유입 증대
              </label>
              <input type='checkbox' name='purpose' value={2} />
              <input type='checkbox' name='purpose' value={3} />
            </div>
          </form>
        </div>
        <footer className={styles.footer}>
          <button type='button' onClick={onCancel} className={styles.cancelButton}>
            취소
          </button>
          <button type='button' onClick={onConfirm} className={styles.confirmButton}>
            확인
          </button>
        </footer>
      </div>
    </div>
  )
}

const Modal = ({ openModal, onCancel, onConfirm }: IModalProps) => {
  const backDropElement = document?.getElementById('backdropRoot')
  const modalElement = document?.getElementById('modalOverlay')

  return (
    <>
      {backDropElement &&
        ReactDOM.createPortal(<BackDrop onCancel={onCancel} openModal={openModal} />, backDropElement)}

      {modalElement &&
        ReactDOM.createPortal(
          <ModalOverlay openModal={openModal} onConfirm={onConfirm} onCancel={onCancel} />,
          modalElement
        )}
    </>
  )
}

export default Modal

import { MouseEventHandler } from 'react'
import ReactDOM from 'react-dom'

import styles from './Modal.module.scss'
import { cx } from 'styles'

interface IBackDropProps {
  openModal: boolean
  onCancel: MouseEventHandler<HTMLButtonElement>
}

interface IModalProps {
  openModal: boolean
  onCancel: MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
}

interface IModalOverlayProps {
  openModal: boolean
  children: React.ReactNode
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

const ModalOverlay = ({ openModal, children }: IModalOverlayProps) => {
  return <div className={cx(styles.modal, { [styles.modalHidden]: !openModal })}>{children}</div>
}

const Modal = ({ onCancel, children, openModal }: IModalProps) => {
  const backDropElement = document?.getElementById('backdropRoot')
  const modalElement = document?.getElementById('modalOverlay')

  return (
    <>
      {backDropElement &&
        ReactDOM.createPortal(<BackDrop onCancel={onCancel} openModal={openModal} />, backDropElement)}

      {modalElement &&
        ReactDOM.createPortal(<ModalOverlay openModal={openModal}>{children}</ModalOverlay>, modalElement)}
    </>
  )
}

export default Modal

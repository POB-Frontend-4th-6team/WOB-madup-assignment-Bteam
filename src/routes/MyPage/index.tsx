import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { useQuery } from 'react-query'
import store from 'store'

import { updateUserProfileAPI } from 'services/user'
import { currentUserState } from 'states/user'

import { ProfileIcon } from 'assets/svgs'
import Button from 'components/Button'
import styles from './myPage.module.scss'

const MyPage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [sendPatch, setSendPatch] = useState(false)
  const [userInputName, setUserInputName] = useState(store.get('user')?.name)
  const setUser = useSetRecoilState(currentUserState)

  const email = store.get('user')?.email
  const name = store.get('user')?.name

  const { isLoading } = useQuery(
    'hello',
    () => {
      return updateUserProfileAPI(`name=${userInputName}`)
    },
    {
      enabled: !!sendPatch,
      onSuccess: (res) => {
        setUser(res)
        store.set('user', res)
        setSendPatch(false)
      },
    }
  )

  const nameInputRef = useRef<HTMLInputElement>(null)

  const handleToggleEditing = () => {
    setIsEditing(true)
  }

  const handleQuitEditing = () => {
    setIsEditing(false)
  }

  const handleTriggerUserNameUpdate = () => {
    setSendPatch(true)
    setIsEditing(false)
  }

  const handleUserNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInputName(e.currentTarget.value)
  }

  useEffect(() => {
    nameInputRef?.current?.focus()
  }, [isEditing])

  return (
    <>
      <header className={styles.header}>
        <h2>마이페이지</h2>
      </header>
      <main className={styles.main}>
        <section className={styles.profileImageContainer}>
          <ProfileIcon className={styles.profileImage} />
        </section>
        <section className={styles.profileDataContainer}>
          <form className={styles.form}>
            <label htmlFor='email'>이메일</label>
            <input id='email' type='email' className={styles.emailInput} disabled placeholder={email} />
            <label htmlFor='name'>이름</label>
            <input
              id='name'
              type='email'
              className={styles.input}
              disabled={!isEditing}
              placeholder={name}
              ref={nameInputRef}
              value={userInputName}
              onChange={handleUserNameInput}
            />
          </form>
          <div className={styles.buttonContainer}>
            {isLoading && <span className={styles.loadingMessage}>이름 수정 중입니다...</span>}
            {isEditing ? (
              <>
                <Button
                  text='취소'
                  width='40px'
                  height='25px'
                  margin='10px 0 0 0'
                  borderRadius='5px'
                  fontSize='12px'
                  color='#94a2ad'
                  border='1px solid #94a2ad'
                  onClick={handleQuitEditing}
                />
                <Button
                  text='확인'
                  width='40px'
                  height='25px'
                  margin='10px 0 0 0'
                  borderRadius='5px'
                  fontSize='12px'
                  color='white'
                  backgroundColor='#586cf5'
                  onClick={handleTriggerUserNameUpdate}
                />
              </>
            ) : (
              <Button
                text='수정'
                width='40px'
                height='25px'
                margin='10px 0 0 0'
                borderRadius='5px'
                fontSize='12px'
                color='white'
                backgroundColor='#586cf5'
                onClick={handleToggleEditing}
              />
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default MyPage

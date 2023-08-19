import { useCallback, useEffect } from 'react'
import { storage } from '@/utils/storage'

export const TabClose = () => {
  const tabClose = useCallback(() => {
    storage.setItem('tabCount', storage.getItem('tabCount')! - 1)
    const count = storage.getItem('tabCount')
    if (count === 0) {
      storage.setItem('tabAllClose', 'yes')
    }
  }, [])

  useEffect(() => {
    storage.setItem('tabAllClose', 'no')
    storage.setItem('tabCount', (storage.getItem('tabCount') ?? 0) + 1)

    window.addEventListener('beforeunload', tabClose)
    return () => {
      window.removeEventListener('beforeunload', tabClose)
      storage.setItem('tabCount', storage.getItem('tabCount')! - 1)
    }
  })

  return (
    <>
      <h2>Tab Close Action</h2>
      <p>show local storage</p>
    </>
  )
}

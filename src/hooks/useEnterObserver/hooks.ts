import { MutableRefObject, useCallback, useId } from 'react'
import { useActionContext } from './provider'


export const useEnter = (
  target: HTMLElement | MutableRefObject<HTMLElement | undefined | null>,
  callback: () => void
) => {
  const { handleEnterRegister } = useActionContext()

  if (target instanceof HTMLElement) {
    handleEnterRegister(target.id, callback)
  } else if (target.current instanceof HTMLElement) {
    handleEnterRegister(target.current.id, callback)
  }
}

export const useLeave = (
  target: HTMLElement | MutableRefObject<HTMLElement | undefined | null>,
  callback: () => void
) => {
  const { handleLeaveRegister } = useActionContext()

  if (target instanceof HTMLElement) {
    handleLeaveRegister(target.id, callback)
  } else if (target.current instanceof HTMLElement) {
    handleLeaveRegister(target.current.id, callback)
  }
}

export const useRegister = () => {
  const id = useId()
  const { handleRegister, handleEnterRegister, handleLeaveRegister } = useActionContext()

  return useCallback((
    target: MutableRefObject<HTMLElement | undefined | null>,
    onEnter?: () => void,
    onLeave?: () => void
  ) => {
    const elem = target.current
    
    if (!elem) {
      return () => {}
    }
    if (elem.id === '') elem.id = id    
    const unregister = handleRegister(elem)

    if (onEnter) handleEnterRegister(elem.id, onEnter)
    if (onLeave) handleLeaveRegister(elem.id, onLeave)
    
    return unregister
  
  }, [])
}

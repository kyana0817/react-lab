import { PropsWithChildren, createContext,  useContext, useEffect, useCallback, useMemo, useRef } from 'react'
import { createObserver } from './core'


type Callback = () => void

type Callbacks = {
  enter: Map<string, Callback>;
  leave: Map<string, Callback>;
}
type State = undefined
type Action = {
  handleRegister: (target: Element) => () => void;
  handleEnterRegister: (id: string, callback: Callback) => void;
  handleLeaveRegister: (id: string, callback: Callback) => void;
}

type ProviderProps = PropsWithChildren<{
  options?: IntersectionObserverInit
}>


const stateContext = createContext<State | undefined>(undefined)
const actionContext = createContext<Action | undefined>(undefined)

export const  useStateContext = () => { // eslint-disable-line react-refresh/only-export-components
  const context = useContext(stateContext)
  if (!context) throw new Error('No EnterObserverProvider set')

  return context
}

export const useActionContext = () => { // eslint-disable-line react-refresh/only-export-components
  const context = useContext(actionContext)
  if (!context) throw new Error('No EnterObserverProvider set')

  return context
}

type Observer = ReturnType<typeof createObserver>
type RefObserver = {
  observer?: Observer['observer'];
} & {
  [K in Exclude<keyof Observer, 'observer'>]: Observer[K];
}

export default function Provider(props: ProviderProps) {
  const { children, options } = props
  const observerRef = useRef<RefObserver>(createObserver(options))
  const callbacks = useRef<Callbacks>({ enter: new Map(), leave: new Map() })

  const handleCreateRegister = useCallback(() => {
    if (!observerRef.current) observerRef.current = createObserver(options)
  }, [options])

  const handleRegister = useCallback((target: Element) => {
    handleCreateRegister()
    if (!observerRef.current.observer) return () => {}
    const observer = observerRef.current.observer
  
    observer.observe(target)
    return () => observer.unobserve(target)
  }, [])

  const handleEnterRegister = useCallback((id: string, callback: Callback) => {
    callbacks.current.enter.set(id, callback)
  }, [])

  const handleLeaveRegister = useCallback((id: string, callback: Callback) => {
    callbacks.current.leave.set(id, callback)
  }, [])

  const handleClear = useCallback(() => {
    callbacks.current.enter.clear()
    callbacks.current.leave.clear()
    if (observerRef.current.observer) {
      observerRef.current.observer.disconnect()
      observerRef.current.observer = undefined
    }
  }, [])

  useEffect(() => {

    return () => {
      handleClear()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const action = useMemo(() => ({
    handleRegister,
    handleEnterRegister,
    handleLeaveRegister
  }), []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <stateContext.Provider value={undefined}>
        <actionContext.Provider value={action}>
          { children }
        </actionContext.Provider>        
      </stateContext.Provider>
    </>
  )
}

import { useEffect, useRef } from 'react'
import { EnterObserverProvider, useRegister } from '@/hooks/useEnterObserver'


const ITEM_NUM = 30

const Item = () => {
  const ref = useRef<HTMLDivElement>(null)
  const register = useRegister()

  useEffect(() => {
    if(ref.current) {
      const unregister = register(ref)
      return () => {
        unregister()
      }
    }
    return () => {}
  }, [register])
  return (
    <div
      ref={ref}
      className="w-24 h-24 bg-lime-200"
    ></div>
  )
}

const ListItem = () => {
  return (
    <div className="grid gap-4">
      {[...Array(ITEM_NUM)].map((_, idx) => (
        <Item key={idx}/>
      ))}
    </div>
  )
}


export const EntryObserver = () => {
  return (
    <>
      <EnterObserverProvider
        options={{
          rootMargin: '0px',
          threshold: 1.0, 
        }}
      >
        <ListItem/>
      </EnterObserverProvider>
    </>
  )
}

import { ComponentType, createContext, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type Context = {
  count: number;
}


const context = createContext<undefined | Context>(undefined)

const useData = () => {
  const data = useContext(context)
  if (data === undefined) throw new Error('provider outside');

  return data 
}

const context2 = createContext<undefined | Context>(undefined)

const useData2 = () => {
  const data = useContext(context2)
  if (data === undefined) throw new Error('provider outside')
  return data
}

const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, setState] = useState(0)
  const [state2, setState2] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setState(prev => prev + 1)
    }, 1000)

    return () => clearInterval(id)
  }, [])
  
  useEffect(() => {
    const id = setInterval(() => {
      setState2(prev => prev + 1)
    }, 2000)

    return () => clearInterval(id)
  }, [])

  const value = useMemo(() => ({
    count: state
  }), [state])

  const value2 = useMemo(() => ({
    count: state2
  }), [state2])

  return (
    <context.Provider value={value}>
      <context2.Provider value={value2}>
        {children}
      </context2.Provider>
    </context.Provider>
  )
}

const HOCProvider = (Component: ComponentType) => {
  return () => {
    const [state, setState] = useState(0)
    const [state2, setState2] = useState(0)
  
    useEffect(() => {
      const id = setInterval(() => {
        setState(prev => prev + 1)
      }, 1000)
  
      return () => clearInterval(id)
    }, [])
    
    useEffect(() => {
      const id = setInterval(() => {
        setState2(prev => prev + 1)
      }, 2000)
  
      return () => clearInterval(id)
    }, [])
  
    const value = useMemo(() => ({
      count: state
    }), [state])
  
    const value2 = useMemo(() => ({
      count: state2
    }), [state2])
    return (
      <context.Provider value={value}>
        <context2.Provider value={value2}>
        <Component/>
        </context2.Provider>
      </context.Provider>
    )
  }
}

const counter = (() => {
  let count = 0;
  return () => count++
})
const ReanderingEffect = () => {
  const ref = useRef<HTMLSpanElement>(null)
  const count = useCallback(counter(), [])
  if (ref.current) ref.current.textContent = `${count()}`
  return <p>re-rendering: <span ref={ref}></span></p>
}

const ConsumerChild = () => {
  const { count } = useData()
  return (
    <>
      <h4>Consumer</h4>
      <p>{`Count: ${count}`}</p>
      <ReanderingEffect />
    </>
  )
}

const ConsumerChild2 = () => {
  const { count } = useData2()
  return (
    <>
      <h4>Consumer 2</h4>
      <p>{`Count: ${count}`}</p>
      <ReanderingEffect />
    </>
  )
}

const NotConsumerChild = () => {
  return (
    <>
      <h4>Not Consumer</h4>
      <p>Count: 0</p>
      <ReanderingEffect />
    </>
  )
}

const Children = () => {

  return (
    <div>
      <ConsumerChild />
      <ConsumerChild2 />
      <NotConsumerChild />
    </div>
  )
}

const MemoChildren = memo(Children)

const UsingHOC = HOCProvider(Children)
const UsingHOCMemo = HOCProvider(MemoChildren)

export const CheckConsumer = () => {
  return (
    <>
      <h2>Check consumer rendering</h2>
      <h3>Within Provider</h3>
      <ContextProvider>
        <Children/>
      </ContextProvider>
      <h3>Within Provider and memo children</h3>
      <ContextProvider>
        <MemoChildren/>
      </ContextProvider>
      <h3>HOC pattern</h3>
      <UsingHOC />
      <h3>HOC pattern and memo children</h3>
      <UsingHOCMemo />
    </>
  )
}
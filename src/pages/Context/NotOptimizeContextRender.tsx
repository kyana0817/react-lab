import { createContext, useContext, useState } from 'react'

type Context = {
  count: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
}


const context = createContext<undefined | Context>(undefined)

const useData = () => {
  const data = useContext(context)
  if (data === undefined) throw new Error('provider outside')

  return data
}

const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, setState] = useState(0)
  const handleIncrement = () => setState(prev=> prev+1)
  const handleDecrement = () => setState(prev=> prev-1)

  return (
    <context.Provider value={{ count: state, handleIncrement, handleDecrement }}>
      {children}
    </context.Provider>
  )
}

const Child = () => {
  const { count } = useData()
  return (
    <>
      <p>{`Count: ${count}`}</p>
    </>
  )
}

const Controler = () => {
  const { handleIncrement, handleDecrement } = useData()
  console.log('re-rendering')
  return (
    <div className='flex gap-2'>
      <button onClick={handleIncrement}>increment</button>
      <button onClick={handleDecrement}>decrement</button>
    </div>
  )
}

export const NotOptimizeContextRender = () => {
  return (
    <>
      <h2>Not optimize context</h2>
      <ContextProvider>
        <div className='mb-2'>
          <Child/>
          <Child/>
          <Child/>
        </div>
        <Controler/>
      </ContextProvider>
    </>
  )
}


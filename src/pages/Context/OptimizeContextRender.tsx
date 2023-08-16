import { createContext, useContext, useReducer } from 'react'

type DataContext = number;

type Action = {
  type: 'increment' | 'decrement'
}

type DispatchContext = {
  dispatch: React.Dispatch<Action>
}

const dataContext = createContext<undefined | DataContext>(undefined)
const dispatchContext = createContext<undefined | DispatchContext>(undefined)

const useData = () => {
  const data = useContext(dataContext)
  if (data === undefined) throw new Error('provider outside')

  return data
}

const useDispatch = () => {
  const dispatch = useContext(dispatchContext)
  if (dispatch === undefined) throw new Error('provider outside')

  return dispatch
}


const reducer = (state: number, action: {type: 'increment' | 'decrement'}) => {
  switch(action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    default:
      return state
  }
}


const ContextProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, 0)

  return (
    <dataContext.Provider value={state}>
      <dispatchContext.Provider value={{ dispatch }}>
        {children}
      </dispatchContext.Provider>
    </dataContext.Provider>
  )
}

const Child = () => {
  const count = useData()
  return (
    <>
      <p>{`Count: ${count}`}</p>
    </>
  )
}

const Controller = () => {
  const { dispatch } = useDispatch()
  
  const handleIncrement = () => dispatch({ type: 'increment' })
  const handleDecrement = () => dispatch({ type: 'decrement' })

  console.log('re-rendering')
  return (
    <div className='flex gap-2'>
      <button onClick={handleIncrement}>increment</button>
      <button onClick={handleDecrement}>decrement</button>
    </div>
  )
}

export const OptimizeContextRender = () => {
  return (
    <>
      <h2>Optimize context</h2>
      <div>
        <ContextProvider>
          <div className='mb-2'>
            <Child/>
            <Child/>
            <Child/>
          </div>
          <Controller/>
        </ContextProvider>

      </div>
    </>
  )
}


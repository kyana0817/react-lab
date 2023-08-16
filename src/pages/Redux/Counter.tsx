import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/useUtils'
import { decrement, increment, toggle } from '@/stores/counter'

const ChildA = () => {
  const count  = useAppSelector(state => state.counter.count)

  console.log('re-rendering: count')
  return (
    <>
      <p>{`Count: ${count}`}</p>
    </>
  )
}

const ChildB = () => {
  const flag = useAppSelector(state => state.counter.flag)

  console.log('re-rendering: flag')
  return (
    <>
      <p>{`Flag: ${flag}`}</p>
    </>
  )
}

const Controller = () => {
  const dispatch = useAppDispatch()
  const handleIncrement = useCallback(() => dispatch(increment()), []) // eslint-disable-line react-hooks/exhaustive-deps
  const handleDecrement = useCallback(() => dispatch(decrement()), []) // eslint-disable-line react-hooks/exhaustive-deps
  const handleToggle = useCallback(() => dispatch(toggle()), []) // eslint-disable-line react-hooks/exhaustive-deps

  console.log('re-rendering')
  return (
    <div className='flex gap-2'>
      <button onClick={handleIncrement}>increment</button>
      <button onClick={handleDecrement}>decrement</button>
      <button onClick={handleToggle}>toggle</button>
    </div>
  )
}

export const Counter = () => {


  return (
    <>
      <h2>Redux Counter Context</h2>
      <div>
        <div className='mb-2'>
          <ChildA/>
          <ChildB/>
        </div>
        <Controller/>

      </div>
    </>
  )
}

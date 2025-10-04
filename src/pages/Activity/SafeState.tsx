import { Activity, useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState(0)  
  return (
    <>
      <p>
        <button onClick={() => setCount((prev) => prev + 1)}>Add</button>        
        {count}
      </p>
      
    </>
  )
} 

const CounterWithActivity = () => {
  const [activity, setActivity] = useState(false)
  return (
    <>
      <h3>Counter with Activity</h3>
      <button onClick={() => setActivity(prev => !prev)}>
        {activity ? 'hidden' : 'visible'}
      </button>
      <Activity mode={activity ? 'hidden': 'visible'}>
        <Counter />
      </Activity>
    </>
  )
}

const CounterWithoutActivity = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <h3>Counter without Activity</h3>
      <button onClick={() => setShow(prev => !prev)}>
        {show ? 'visible' : 'hidden'}
      </button>
      {show && <Counter />}
    </>
  )
}

export const SafeState = () => {
  return (
    <>
      <h2>SafeState</h2>
      <CounterWithActivity />
      <CounterWithoutActivity />
    </>
  )
}

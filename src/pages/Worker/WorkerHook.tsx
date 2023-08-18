import { useState } from 'react'
import { useWorker } from '@/hooks/useWorker'
const url = new URL('@/workers/heavyProcess', import.meta.url)
type WorkerAction = typeof import('@/workers/heavyProcess').default

export const WorkerHook = () => {
  const { postMessage } = useWorker<WorkerAction>(url)
  const [fibo, setFibo] = useState(0)
  const [n, setN] = useState(0)

  const handleClick = async () => {
    const fibo = await postMessage('fib', [n])
    const test = await postMessage('promise', ['hello'])
    console.log(test)
    setFibo(fibo)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setN(parseInt(e.target.value))
  }

  return (
    <>
      <h2>Worker Hook</h2>
      <p>{`Fibonacci: ${fibo}`}</p>
      <input
        type="number"
        onChange={handleChange}
        value={n}
      />
      <button onClick={handleClick}>fib</button>
    </>
  )


}

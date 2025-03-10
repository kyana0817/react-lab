import { useState, useEffect } from 'react'
import { useBool } from '@/hooks/useUtils'
import { useWorker } from '@/hooks/useWorker'
type WorkerAction = typeof import('@/workers/heavyProcess').default

const fib = (n: number): number => {
  if( n === 0)
    return 0
  else if (n === 1)
    return 1
  else return fib(n - 1) + fib(n - 2)
}

export const Timer = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count => count + 1)
    }, 100)
    return () => clearInterval(id)
  }, [])
  return (
    <>
      <h2>Timer</h2>
      <p>{`Count: ${count}`}</p>
    </>
  )

}

export const UIThread = () => {
  const [fibo, setFibo] = useState(0)
  const [n, setN] = useState(0)
  const [
    isProcessing, handleStart, handleFinish
  ] = useBool()

  const handleClick = () => {
    handleStart()
    setTimeout(() => {
      const fibo = fib(n)
      setFibo(fibo)
      handleFinish()
    }, 4)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setN(parseInt(e.target.value))
  }

  return (
    <>
      <h2>UI Thread</h2>
      {isProcessing
        ?<p>Processing...</p>
        :<p>{`Fibonacci: ${fibo}`}</p>
      }
      <input
        className="mr-1"
        type="number"
        onChange={handleChange}
        value={n}
      />
      <button
        onClick={handleClick}
        disabled={isProcessing}
      >
        fib
      </button>
    </>
  )

}
export const WorkerHook = () => {
  const { postMessage } = useWorker<WorkerAction>(new Worker(new URL('@/workers/heavyProcess', import.meta.url), { type: 'module' }))
  const [fibo, setFibo] = useState(0)
  const [n, setN] = useState(0)
  const [
    isProcessing, handleStart, handleFinish
  ] = useBool()

  const handleClick = () => {
    handleStart()
    postMessage('fib2', [n])
      .then((fibo) => {
        setFibo(fibo)
        handleFinish()
      })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setN(parseInt(e.target.value))
  }

  return (
    <>
      <h2>Worker Thread</h2>
      {isProcessing
        ?<p>Processing...</p>
        :<p>{`Fibonacci: ${fibo}`}</p>
      }
      <input
        className="mr-1"
        type="number"
        onChange={handleChange}
        value={n}
      />
      <button
        onClick={handleClick}
        disabled={isProcessing}
      >
        fib
      </button>
    </>
  )
}

import { expose } from '@/hooks/useWorker'
declare let self: DedicatedWorkerGlobalScope

const fib = (n: number) => {
  let a = 0, b = 1, c, i
  if( n == 0)
    return a
  for(i = 2; i <= n; i++)
  {
    c = a + b
    a = b
    b = c
  }
  return b


}

const fib2 = (n: number): number => {
  if( n === 0)
    return 0
  else if (n === 1)
    return 1
  else return fib2(n - 1) + fib2(n - 2)
}

const promise = (message: string) => {
  return Promise.resolve(message)
}

export default expose({ fib, fib2, promise }, self)

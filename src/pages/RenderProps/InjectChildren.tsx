import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'


const context = createContext({
  count: 0,
  count2: 0
})

const useCount = () => {
  return useContext(context)
}

export const CountProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + 1)
    }, 5000)
    const interval2 = setInterval(() => {
      setCount2((prev) => prev + 1)
    }, 1000)
    return () => {
      clearInterval(interval)
      clearInterval(interval2)
    }
  }, [])

  const value = useMemo(() => ({ count, count2 }), [count, count2])

  return (
    <context.Provider value={value}>
      {children}
    </context.Provider>
  )
}

const ViewCount = ({ count }: { count: number }) => {
  console.log('re-rendering:', count)
  return (
    <div>
      Count:
      {count}
    </div>
  )
}

type InjectChildrenProps = {
  children: (count: number) => React.ReactNode
}
const InjectChildren = ({ children }: InjectChildrenProps) => {
  const { count, count2 } = useCount()

  return (
    <div className='flex flex-col gap-4'>
      <div><ViewCount count={count2} /></div>
      <div>{children(count)}</div>
    </div>
  )
}

const OptimizeInjectChildren = ({ children: _children }: InjectChildrenProps) => {
  const { count, count2 } = useCount()

  const children = useMemo(() => _children(count), [_children, count])

  return (
    <div className='flex flex-col gap-4'>
      <div><ViewCount count={count2} /></div>
      <div>{children}</div>
    </div>
  )
}

export const NoOptimize = () => {
  return (
    <div>
      <h2>No Optimize</h2>
      <InjectChildren>
        {(count) => <ViewCount count={count} />}
      </InjectChildren>
    </div>
  )
}

export const Optimize = () => {
  return (
    <div>
      <h2>Optimize</h2>
      <OptimizeInjectChildren>
        {(count) => <ViewCount count={count} />}
      </OptimizeInjectChildren>
    </div>
  )
}


const MemoViewCount = React.memo(ViewCount)

export const Optimize2 = () => {
  return (
    <div>
      <h2>Optimize 2</h2>
      <InjectChildren>
        {(count) => <MemoViewCount count={count} />}
      </InjectChildren>
    </div>
  )
}

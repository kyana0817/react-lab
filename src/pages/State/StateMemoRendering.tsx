import React, { useCallback, useState } from 'react'

type ButtonAreaProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonArea = React.memo(({ handleClick }: ButtonAreaProps) => {
  console.log('render: memo')
  return (
    <div className="flex gap-2">
      <button
        name="decrement"
        onClick={handleClick}
      >
        -1
      </button>
      <button
        name="increment"
        onClick={handleClick}
      >
        +1
      </button>
    </div>
  )})

ButtonArea.displayName = 'ButtonArea'

const Heading = () => {
  console.log('re-render')
  return (
    <>
      <h2>Using state memo</h2>
    </>
  )
}

export const StateMemoRendering = () => {
  const [count, setCount] = useState(0)

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement
    setCount(prev => name === 'increment'? prev + 1: prev - 1)
  }, [])

  return (
    <>
      <Heading />
      <div>
        state value:
        {count}
      </div>
      <ButtonArea handleClick={handleClick} />
    </>
  )
}

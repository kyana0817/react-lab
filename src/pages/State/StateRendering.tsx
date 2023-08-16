import React, { useState } from 'react'

type ButtonAreaProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const ButtonArea = ({ handleClick }: ButtonAreaProps) => {
  console.log('render: no memo')
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
  )}

export const StateRendering = () => {
  const [count, setCount] = useState(0)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.target as HTMLButtonElement
    setCount(prev => name === 'increment'? prev + 1: prev - 1)
  }

  return (
    <>
      <h2>Using state</h2>
      <div>
        state value:
        {count}
      </div>
      <ButtonArea handleClick={handleClick}/>
    </>
  )
}

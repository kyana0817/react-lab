import { useState } from 'react'

const counter = () => {
  let count = 0
  return () => count++
}
export const RenderingEffect = () => {
  const [count] = useState(() => counter())
  return (
    <p>
      re-rendering:
      <span>{count()}</span>
    </p>
  )
}

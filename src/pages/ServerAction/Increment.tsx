import { useTransition, useState } from 'react'
import incrementLike from '@/actions/incrementLike'

'use client'

export const Increment = () => {
  const [isPending, startTransition] = useTransition()
  const [likeCount, setLikeCount] = useState(0)

  const handleClick = () => {
    startTransition(async () => {
      console.log(incrementLike)
      const currenctCount = await incrementLike() 
      setLikeCount(currenctCount)
    })
  }
  return (
    <>
      <h2>Increment</h2>
      <div>
        <p>
          count:
          {likeCount}
        </p>
        <button
          onClick={handleClick}
          disabled={isPending}
        >
          Like
        </button>
      </div>
    </>
  )
}

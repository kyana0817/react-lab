import { fetchQueueClient } from 'fetch-family'
import { useEffect, useState } from 'react'
import { Spinner } from '@/components/Spinner'
import { useBool } from '@/hooks/useUtils'


const fetchQueue = fetchQueueClient()
const IMAGE_URL = new URL('@/assets/img/sample.jpg', import.meta.url)

const useImage = (url: string | URL) => {
  const [blobURL, setBlobURL] = useState<string | undefined>(undefined)
  const [
    isSuccess, handleSuccessed, handleUnsuccess
  ] = useBool()
  useEffect(() => {
    (async () => {
      handleUnsuccess()
      await fetchQueue(url, { convertType: 'blob' })
        .then((data) => setBlobURL(URL.createObjectURL(data)))
      handleSuccessed()
    })()
    return () => {
      setBlobURL((prev) => {
        if (!prev) return prev
        URL.revokeObjectURL(prev)
        return ''
      }) 
    }
  }, [])

  return { blobURL, isSuccess }
}

const Image = () => {
  const { blobURL, isSuccess } = useImage(IMAGE_URL)
  return (
    <div className='w-32'>
      {isSuccess? (
        <img
          className='w-full'
          src={blobURL}
          alt="aaa"
        />
      ): (
        <Spinner/>
      )}
    </div>
  )
}

export const FetchQueue = () => {
  const [
    isExecute, handleStart, handleClear
  ] = useBool()
  return (
    <>
      <h2>
        usage: FetchQueue
      </h2>      
      <button
        onClick={isExecute? handleClear: handleStart}
        className='mb-2'
      >
        {isExecute? 'clear': 'start'}
      </button>
      {isExecute && (
        <div>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
          <Image/>
        </div>
      )}
    </>
  )
}
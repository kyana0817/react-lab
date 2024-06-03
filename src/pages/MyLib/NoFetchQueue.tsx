import { useEffect, useState } from 'react'
import { Spinner } from '@/components/Spinner'
import { useBool } from '@/hooks/useUtils'

const IMAGE_NUM = 40
const IMAGE_URL = new URL('@/assets/img/sample.jpg', import.meta.url)

const useImage = (url: string | URL) => {
  const [blobURL, setBlobURL] = useState<string | undefined>(undefined)
  const [
    isSuccess, handleSuccessed, handleUnsuccess
  ] = useBool()
  useEffect(() => {
    handleUnsuccess()
    fetch(url)
      .then(res => res.blob())
      .then((data) => setBlobURL(URL.createObjectURL(data)))
      .then(() => handleSuccessed())
    return () => {
      setBlobURL((prev) => {
        if (!prev) return prev
        URL.revokeObjectURL(prev)
        return ''
      }) 
    }
  }, [
    handleSuccessed, handleUnsuccess, url
  ])

  return { blobURL, isSuccess }
}

const Image = () => {
  const { blobURL, isSuccess } = useImage(IMAGE_URL)
  return (
    <div className='w-32 h-48'>
      {isSuccess? (
        <img
          decoding='async'
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

export const NoFetchQueue = () => {
  const [
    isExecute, handleStart, handleClear
  ] = useBool()
  return (
    <>
      <h2>
        no-usage: FetchQueue
      </h2>      
      <button
        onClick={isExecute? handleClear: handleStart}
        className='mb-2'
      >
        {isExecute? 'clear': 'start'}
      </button>
      {isExecute && (
        <div className='grid justify-items-center items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4'>
          {[...Array(IMAGE_NUM)].map((_, idx) => (
            <>
              <Image key={idx}/>
            </>
          ))}
        </div>
      )}
    </>
  )
}

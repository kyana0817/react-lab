import React from 'react'

const HelloWorldScene = React.lazy(() => import('./HelloWorldScene'))

export const Home = () => {
  return (
    <div className='h-[min(700px,70vh)] w-full'>
      <React.Suspense fallback={<p className='text-white/70 text-center text-sm'>Loading 3D scene...</p>}>
        <HelloWorldScene/>
      </React.Suspense>
    </div>
  )
}

import React, { useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet, useLocation } from 'react-router-dom'
import { Spinner } from '@/components/Spinner'
import type { Routes } from '@/types'
import { SideBar } from './SideBar'

type BaseLayoutProps = {
  routes: Routes
}

const Fallback = () => (
  <div className='w-max mx-auto mt-20'>
    <Spinner/>
  </div>
)

export const BaseLayout = ({ routes }: BaseLayoutProps) => {
  const { pathname } = useLocation()
  const pageTitle = useMemo(() => {
    const route = routes.find(item => item.path === pathname)
    return route? route.title: 'Error!'
  }, [routes, pathname])

  return (
    <>
      <Helmet>
        {pageTitle && (
          <title>
            React Re-Render |
            {' '}
            {pageTitle}
          </title>
        )}
      </Helmet>
      <div className="bg-primary min-h-[100vh] flex">
        <SideBar routes={routes}/>
        <main className="flex-1 px-4 md:px-14 lg:px-32 pt-8 flex flex-col">
          <header className='border-b-2'>
            <h1>
              {pageTitle}
            </h1>
          </header>
          <div className="flex-grow-[1] flex flex-col">
            <div className="overflow-y-auto flex-grow-[1] px-2 py-4 min-h-auto h-0">
              <React.Suspense fallback={<Fallback/>}>
                <Outlet/>
              </React.Suspense>
            </div>
          </div>
          <footer className='border-t-2'>
            <div className='pt-2 pb-4'>
              <p className="text-center">
                Copyright 2023 by kyana0817
              </p>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}

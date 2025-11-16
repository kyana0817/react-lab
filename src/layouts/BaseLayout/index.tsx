import React, { useMemo } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Spinner } from '@/components/Spinner'
import { MobileMenu } from '@/layouts/BaseLayout/MobileMenu'
import type { Groups } from '@/types'
import { SideBar } from './SideBar'

type BaseLayoutProps = {
  groups: Groups
}

const Fallback = () => (
  <div className='w-max mx-auto mt-20'>
    <Spinner/>
  </div>
)

export const BaseLayout = ({ groups }: BaseLayoutProps) => {
  const { pathname } = useLocation()
  const pageTitle = useMemo(() => {
    const routes = groups.flatMap(group => group.routes)
    const route = routes.find(item => item.path === pathname)
    return route? route.title: 'Error!'
  }, [pathname, groups])

  return (
    <>
      <title>
        {`${pageTitle} | React Re-Render`}
      </title>
      <div className="bg-primary min-h-[100vh] flex">
        <SideBar groups={groups}/>
        <MobileMenu groups={groups}/>
        <main className="relative flex-1 overflow-hidden bg-primary text-white px-4 md:px-10 lg:px-16 xl:px-28 py-8 flex flex-col">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-pink-500/30 blur-[140px]"/>
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/70 blur-[200px] opacity-70"/>
          </div>
          <div className="relative z-10 flex flex-col gap-6 flex-1">
            <header className='rounded-[32px] border border-white/10 bg-white/5 px-6 py-6 shadow-[0_24px_80px_rgba(5,6,15,0.45)] backdrop-blur-xl'>
              <p className='text-xs font-semibold uppercase tracking-[0.35em] text-white/60'>
                Live demo
              </p>
              <div className='mt-2 flex flex-wrap items-end gap-4'>
                <h1 className='text-3xl sm:text-4xl font-bold leading-tight'>
                  {pageTitle}
                </h1>
              </div>
              <p className='mt-3 text-sm text-white/70 max-w-3xl'>
                Explore rendering behaviors, patterns, and interactive experiments tailored for the
                <span className='mx-1 font-semibold text-white'>
                  {pageTitle}
                </span>
                module.
              </p>
            </header>
            <section className='flex-1 min-h-0 flex flex-col'>
              <div className='relative flex-1 min-h-0 rounded-[36px] border border-white/10 bg-gradient-to-b from-white/15 via-white/5 to-transparent shadow-[0_35px_120px_rgba(3,5,15,0.55)] overflow-hidden'>
                <div className='absolute inset-0 pointer-events-none'>
                  <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,113,191,0.35),_transparent_55%)] opacity-80'/>
                </div>
                <div className='relative flex flex-col h-full'>
                  <div className='flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-4 text-sm text-white/70'>
                    <div>
                      <p className='font-semibold uppercase tracking-[0.3em] text-white/60'>
                        Render surface
                      </p>
                      <p className='text-xs text-white/50'>
                        Live preview updates every interaction
                      </p>
                    </div>
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 lg:px-10 py-6">
                    <React.Suspense fallback={<Fallback/>}>
                      <Outlet/>
                    </React.Suspense>
                  </div>
                </div>
              </div>
            </section>
            <footer className='rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white/70 text-center backdrop-blur-xl'>
              <p>
                Copyright 2023- by kyana0817
              </p>
            </footer>
          </div>
        </main>
      </div>
    </>
  )
}

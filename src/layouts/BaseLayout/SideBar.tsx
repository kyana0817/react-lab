import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Route, Routes, Group, Groups } from '@/types'
import { cls } from '@/utils/cls'

type SideBarListItemProps = {
  route: Route
}

type SideBarListProps = {
  title: Group['title']
  routes: Routes
}

type SideBarProps = {
  groups: Groups
}


const SideBarListItem = ({ route }: SideBarListItemProps) => {
  const { pathname } = useLocation()
  const isSelect = useMemo(() => {
    return route.path === pathname
  }, [pathname])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <li>
      <Link
        aria-current={isSelect ? 'page' : undefined}
        className={cls(
          [
            'group', 'relative', 'flex', 'items-center', 'gap-3',
            'px-4', 'py-2.5', 'rounded-xl',
            'text-sm', 'font-medium', 'tracking-tight',
            'transition-all', 'duration-200',
            'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-pink-500/40'
          ],
          isSelect
            ? [
              'text-pink-200',
              'bg-primary/30',
              'border',
              'border-white/10',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
            ]
            : [
              'text-white/80',
              'hover:text-white',
              'hover:bg-primary/10',
              'hover:border-white/5',
              'border',
              'border-transparent'
            ]
        )}
        to={route.path}
      >
        <span
          aria-hidden
          className={cls(
            [
              'h-2.5', 'w-2.5', 'rounded-full',
              'transition-transform', 'duration-200'
            ],
            isSelect
              ? [
                'bg-pink-300',
                'scale-110',
                'shadow-[0_0_15px_rgba(244,114,182,0.7)]'
              ]
              : [
                'bg-pink-500/40',
                'group-hover:scale-110'
              ]
          )}
        />
        <span>{route.title}</span>
      </Link>
    </li>
  )
}

const SideBarList = ({ title, routes }: SideBarListProps) => {
  return (
    <div className="mt-4 rounded-2xl border border-white/5 bg-primary/20 shadow-[0_12px_30px_rgba(15,23,42,0.35)]">
      <p className='px-5 pt-4 pb-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/60'>
        {title}
      </p>
      <ul className='px-2 pb-3 space-y-1'>
        {routes.map(route => (
          <SideBarListItem
            key={route.title}
            route={route}
          />
        ))}
      </ul>
    </div>
  )
}


export const SideBar = ({ groups }: SideBarProps) => {
  return (
    <aside className="hidden md:flex w-72 lg:w-80 xl:w-96 border-r border-white/10 bg-secondary/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.65)]">
      <div className="flex flex-col h-screen w-full static top-0">
        <div className="px-6 pt-8 pb-6 border-b border-white/10">
          <p className='text-xs font-semibold uppercase tracking-[0.4em] text-pink-200/80'>
            Playground
          </p>
          <p className="mt-2 text-2xl font-bold text-white">
            React Re-Rendering
          </p>
          <p className='mt-1 text-sm text-white/70'>
            Rendering patterns & experiments
          </p>
        </div>
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          {groups.map(({ title, routes }) => (
            <SideBarList
              key={title}
              title={title}
              routes={routes}
            />
          ))}
        </div>
      </div>
    </aside>
  )
}

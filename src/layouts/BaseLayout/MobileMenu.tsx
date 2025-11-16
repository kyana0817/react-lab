import { Fragment, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useBool } from '@/hooks/useUtils'
import { Groups, Group, Routes, Route } from '@/types'
import { cls } from '@/utils/cls'


type SideBarListItemProps = {
  route: Route
  handleClose: VoidFunction
}

type SideBarListProps = {
  title: Group['title']
  routes: Routes
  handleClose: VoidFunction
}


type MobileMenuProps = {
  groups: Groups
}
const SideBarListItem = ({ route, handleClose }: SideBarListItemProps) => {
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
            'group', 'flex', 'items-center', 'gap-3',
            'px-4', 'py-3', 'rounded-2xl',
            'border', 'border-white/5',
            'text-base', 'font-medium', 'tracking-tight',
            'transition-all', 'duration-200',
            'focus-visible:outline-none', 'focus-visible:ring-2', 'focus-visible:ring-pink-400/50'
          ],
          isSelect
            ? [
              'bg-primary/50',
              'text-pink-200',
              'shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]'
            ]
            : [
              'text-white/80',
              'hover:text-white',
              'hover:bg-primary/30',
              'hover:border-white/20'
            ]
        )}
        to={route.path}
        onClick={handleClose}
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
                'shadow-[0_0_12px_rgba(244,114,182,0.7)]'
              ]
              : [
                'bg-pink-400/60',
                'group-hover:scale-110'
              ]
          )}
        />
        <span>{route.title}</span>
      </Link>
    </li>
  )
}

const SideBarList = ({ title, routes, handleClose }: SideBarListProps) => {
  return (
    <div className="mt-5 rounded-3xl border border-white/10 bg-primary/30 shadow-[0_15px_40px_rgba(7,10,20,0.55)]">
      <p className='px-5 pt-4 pb-2 text-[0.65rem] uppercase tracking-[0.3em] text-white/70'>
        {title}
      </p>
      <ul className='px-2 pb-4 space-y-2'>
        {routes.map(route => (
          <SideBarListItem
            key={route.title}
            route={route}
            handleClose={handleClose}
          />
        ))}
      </ul>
    </div>
  )
}

export const MobileMenu = ({ groups }: MobileMenuProps) => {
  const [
    isOpen, _handleOpen, handleClose, handleToggle
  ] = useBool()

  return (
    <Fragment>
      <div
        className={cls(
          [
            'fixed', 'top-4', 'right-4', 'z-30', 'flex', 'md:hidden', 'transition-all', 'duration-200'
          ],
          isOpen
            ? [
              'scale-95',
              'opacity-0',
              'pointer-events-none'
            ]
            : ['opacity-100']
        )}
      >
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
          className="flex items-center gap-3 rounded-full border border-white/15 bg-secondary/80 px-4 py-2 text-white shadow-[0_15px_35px_rgba(8,10,20,0.65)] backdrop-blur-xl transition hover:bg-secondary/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
          onClick={handleToggle}
        >
          <span className="sr-only">
            {`メニューを${isOpen ? '閉じる' : '開く'}`}
          </span>
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-primary/60">
            <span className="flex flex-col gap-1.5">
              <span className="block h-[2px] w-5 rounded-full bg-white" />
              <span className="block h-[2px] w-5 rounded-full bg-white" />
              <span className="block h-[2px] w-5 rounded-full bg-white" />
            </span>
          </span>
          <span className='text-sm font-semibold tracking-[0.2em] uppercase'>
            Menu
          </span>
        </button>
      </div>
      {isOpen && (
        <Fragment>
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-[2px]"
            onClick={handleClose}
          />
          <nav
            id="mobile-nav-drawer"
            aria-label="モバイルナビゲーション"
            className="fixed inset-y-0 right-0 z-50 w-[88vw] max-w-sm border-l border-white/10 bg-gradient-to-b from-secondary/95 to-primary/95 text-white shadow-[0_25px_80px_rgba(5,6,15,0.8)]"
          >
            <div className='flex h-full flex-col'>
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.35em] text-pink-200/80'>
                    Playground
                  </p>
                  <p className='text-2xl font-bold'>
                    React Re-Rendering
                  </p>
                  <p className='text-sm text-white/70'>
                    Rendering patterns & experiments
                  </p>
                </div>
                <button
                  type='button'
                  className='flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-primary/40 text-white transition hover:bg-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60'
                  onClick={handleClose}
                >
                  <span className='sr-only'>メニューを閉じる</span>
                  <span className='text-xl font-light'>×</span>
                </button>
              </div>
              <div className='flex-1 overflow-y-auto px-4 pb-10 pt-2'>
                {groups.map(({ title, routes }) => (
                  <SideBarList
                    key={title}
                    title={title}
                    routes={routes}
                    handleClose={handleClose}
                  />
                ))}
              </div>
            </div>
          </nav>
        </Fragment>
      )}
    </Fragment>
  )
}

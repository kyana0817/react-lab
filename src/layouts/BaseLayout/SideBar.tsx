import { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { Route, Routes } from '@/types'
import { cls } from '@/utils/cls'

type SideBarListItemProps = {
  route: Route
}

type SideBarListProps = {
  routes: Routes
}

type SideBarProps = {
  routes: Routes
}


const SideBarListItem = ({ route }: SideBarListItemProps) => {
  const { pathname } = useLocation()
  const isSelect = useMemo(() => {
    return route.path === pathname
  }, [pathname])  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <li>
      <Link 
        className={cls(
          ['block', 'px-2', 'py-1'],
          isSelect
            ?['text-pink-600', 'font-bold']
            :['hover:text-pink-200', 'focus:text-pink-200']
        )}
        to={route.path}
      >
        {route.title}
      </Link>
    </li>
  )
}

const SideBarList = ({ routes }: SideBarListProps) => (
  <div>
    <ul>
      {routes.map(route => (
        <SideBarListItem
          key={route.title}
          route={route}
        />
      ))}
    </ul>
  </div>
)


export const SideBar = ({ routes }: SideBarProps) => {
  return (
    <>
      <aside className="border-r-2 bg-secondary">
        <div className="my-2">
          <div className="border-b-2 pb-2 px-2">
            <p className="text-xl">
              React Re-Rendering
            </p>
          </div>
          <SideBarList routes={routes}/>
        </div>
      </aside>
    </>
  )
}

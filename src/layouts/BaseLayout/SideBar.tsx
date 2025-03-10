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
        className={cls(
          [
            'block', 'px-2', 'py-1'
          ],
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

const SideBarList = ({ title, routes }: SideBarListProps) => (
  <div>
    <p className='px-2 pt-2 pb-1 text-sm text-gray-400'>
      {title}
    </p>
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


export const SideBar = ({ groups }: SideBarProps) => {
  return (
    <aside className="hidden md:block border-r-2 bg-secondary">
      <div className="my-2">
        <div className="border-b-2 pb-2 px-2">
          <p className="text-xl">
            React Re-Rendering
          </p>
        </div>
        {groups.map(({ title, routes }) => (
          <SideBarList
            key={title}
            title={title}
            routes={routes}
          />
        ))}
      </div>
    </aside>
  )
}

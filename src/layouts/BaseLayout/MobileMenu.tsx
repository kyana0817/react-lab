import { useMemo } from 'react'
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
        className={cls(
          [
            'block', 'px-2', 'py-1'
          ],
          isSelect
            ?['text-pink-600', 'font-bold']
            :['hover:text-pink-200', 'focus:text-pink-200']
        )}
        to={route.path}
        onClick={handleClose}
      >
        {route.title}
      </Link>
    </li>
  )
}

const SideBarList = ({ title, routes, handleClose }: SideBarListProps) => (
  <div>
    <p className='px-2 pt-2 pb-1 text-sm text-gray-400'>
      {title}
    </p>
    <ul>
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

export const MobileMenu = ({ groups }: MobileMenuProps) => {
  const [
    isOpen, _handleOpen, handleClose, handleToggle
  ] = useBool()

  return (
    <div className="block md:hidden fixed top-8 right-4 z-10">
      <div>
        <button
          className="ml-auto block"
          onClick={handleToggle}
        >
          M
        </button>
      </div>
      {isOpen && (
        <div className="bg-secondary border-2 max-h-[60dvh] overflow-y-auto mt-4">
          {groups.map(({ title, routes }) => (
            <SideBarList
              key={title}
              title={title}
              routes={routes}
              handleClose={handleClose}
            />
          ))}
        </div>
      )}
    </div>
  )
}

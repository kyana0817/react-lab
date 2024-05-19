import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BaseLayout } from '@/layouts'
import { ServerAction } from '@/pages'
import type { Groups } from '@/types'
import { lazyImport } from '@/utils/lazyImport'

const { Home } = lazyImport(() => import('@/pages'), 'Home')
const { State } = lazyImport(() => import('@/pages'), 'State')
const { Context } = lazyImport(() => import('@/pages'), 'Context')
const { Redux } = lazyImport(() => import('@/pages'), 'Redux')
const { Worker } = lazyImport(() => import('@/pages'), 'Worker')
const { BrowserAction } = lazyImport(() => import('@/pages'), 'BrowserAction')
const { IntersectionObserver } = lazyImport(() => import('@/pages'), 'IntersectionObserver')
const { MyLib } = lazyImport(() => import('@/pages'), 'MyLib')
const { Tanstack } = lazyImport(() => import('@/pages'), 'Tanstack')


const groups: Groups = [
  { title: 'Basic', routes: [
    { title: 'Home', path: '/' },
    { title: 'State', path: '/state' },
    { title: 'Context', path: '/context' },
    { title: 'Redux', path: '/redux' },
    { title: 'Worker', path: '/worker' },
    { title: 'BrowserAction', path: '/browser-action' },
    { title: 'IntersectionObserver', path: '/intersection-observer' },
    { title: 'MyLib', path: '/mylib' },
    { title: 'Tanstack', path: '/tanstack' }
  ] },
  { title: 'Experimental', routes: [{ title: 'ServerAction', path: '/server-action' }] }
]


const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout groups={groups}/>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/state',
        element: <State />
      },
      {
        path: '/context',
        element: <Context />
      },
      {
        path: '/redux',
        element: <Redux />
      },
      {
        path: '/worker',
        element: <Worker/>
      },
      {
        path: '/browser-action',
        element: <BrowserAction/>
      },
      {
        path: '/intersection-observer',
        element: <IntersectionObserver/>
      },
      {
        path: '/mylib',
        element: <MyLib/>
      },
      {
        path: '/tanstack',
        element: <Tanstack/>
      },
      {
        path: '/server-action',
        element: <ServerAction/>
      }
    ]
  }
])

export const AppRouter = () => {
  return <RouterProvider router={router}/>
}

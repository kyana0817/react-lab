import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BaseLayout } from '@/layouts'
import type { Routes } from '@/types'
import { lazyImport } from '@/utils/lazyImport'

const { Home } = lazyImport(() => import('@/pages'), 'Home')
const { State } = lazyImport(() => import('@/pages'), 'State')
const { Context } = lazyImport(() => import('@/pages'), 'Context')
const { Redux } = lazyImport(() => import('@/pages'), 'Redux')


const routes: Routes = [
  { title: 'Home', path: '/' },
  { title: 'State', path: '/state' },
  { title: 'Context', path: '/context' },
  { title: 'Redux', path: '/redux' }
]


const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout routes={routes}/>,
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
      }
    ]
  }
])

export const AppRouter = () => {
  return <RouterProvider router={router}/>
}

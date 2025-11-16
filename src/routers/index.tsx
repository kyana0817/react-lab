import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { BaseLayout } from '@/layouts'
import type { Groups } from '@/types'
import { lazyImport } from '@/utils/lazyImport'

const { Home } = lazyImport(() => import('@/pages/Home'), 'Home')
const { State } = lazyImport(() => import('@/pages/State'), 'State')
const { Context } = lazyImport(() => import('@/pages/Context'), 'Context')
const { Redux } = lazyImport(() => import('@/pages/Redux'), 'Redux')
const { Worker } = lazyImport(() => import('@/pages/Worker'), 'Worker')
const { BrowserAction } = lazyImport(() => import('@/pages/BrowserAction'), 'BrowserAction')
const { IntersectionObserver } = lazyImport(() => import('@/pages/IntersectionObserver'), 'IntersectionObserver')
const { MyLib } = lazyImport(() => import('@/pages/MyLib'), 'MyLib')
const { Tanstack } = lazyImport(() => import('@/pages/Tanstack'), 'Tanstack')
const { Activity } = lazyImport(() => import('@/pages/Activity'), 'Activity')
const { TypeGPU } = lazyImport(() => import('@/pages/TypeGPU'), 'TypeGPU')
const { ServerAction } = lazyImport(() => import('@/pages/ServerAction'), 'ServerAction')


const groups: Groups = [
  { title: 'Basic', routes: [
    { title: 'Home', path: '/' },
    { title: 'State', path: '/state' },
    { title: 'Context', path: '/context' },
    { title: 'Activity', path: '/activity' },
    { title: 'Redux', path: '/redux' },
    { title: 'Worker', path: '/worker' },
    { title: 'BrowserAction', path: '/browser-action' },
    { title: 'IntersectionObserver', path: '/intersection-observer' },
    { title: 'MyLib', path: '/mylib' },
    { title: 'Tanstack', path: '/tanstack' },
    { title: 'TypeGPU', path: '/type-gpu' }
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
        path: '/activity',
        element: <Activity />
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
        path: '/type-gpu',
        element: <TypeGPU/>
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

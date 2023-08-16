import { FetchStateRendering } from '@/pages/State/FetchStateRendering'
import { StateMemoRendering } from '@/pages/State/StateMemoRendering'
import { NoStateRendering } from './NoStateRendering'
import { StateRendering } from './StateRendering'


export const State = () => {
  return (
    <>
      <NoStateRendering />
      <StateRendering />
      <StateMemoRendering />
      <FetchStateRendering />
    </>
  )
}

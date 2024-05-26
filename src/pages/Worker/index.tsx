import { Timer, UIThread, WorkerHook } from '@/pages/Worker/WorkerHook'

export const Worker = () => {
  return (
    <>
      <Timer/>
      <UIThread/>
      <WorkerHook/>
    </>
  )
}

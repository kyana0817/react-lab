import { CountProvider, NoOptimize, Optimize, Optimize2 } from '@/pages/RenderProps/InjectChildren'

export const RenderProps = () => {
  return( 
    <CountProvider>
      <NoOptimize />
      <Optimize />
      <Optimize2 />
    </CountProvider>
  )
}

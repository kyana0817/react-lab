import { CountProvider, NoOptimize, Optimize } from '@/pages/RenderProps/InjectChildren'

export const RenderProps = () => {
  return( 
    <CountProvider>
      <NoOptimize />
      <Optimize />
    </CountProvider>
  )
}

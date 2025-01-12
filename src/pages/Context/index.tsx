import { CheckConsumer } from '@/pages/Context/CheckConsumer'
import { NotOptimizeContextRender } from './NotOptimizeContextRender'
import { OptimizeContextRender } from './OptimizeContextRender'

export const Context = () => {
  return (
    <>
      <NotOptimizeContextRender/>
      <OptimizeContextRender/>
      <CheckConsumer/>
    </>
  )
}

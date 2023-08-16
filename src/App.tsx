import { AppProvider } from '@/providers'
import { AppRouter } from '@/routers'
function App() {
  return (
    <AppProvider>
      <AppRouter/>
    </AppProvider>
  )
}

export default App

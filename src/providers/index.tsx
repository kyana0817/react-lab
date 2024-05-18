import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from '@/stores'

type AppProviderProps = React.PropsWithChildren

const queryClinet = new QueryClient()

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClinet}>
          {children}
        </QueryClientProvider>
      </ReduxProvider>
    </>
  )
}

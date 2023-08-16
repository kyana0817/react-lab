import React from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'
import store from '@/stores'

type AppProviderProps = React.PropsWithChildren

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <>
      <ReduxProvider store={store}>
        <HelmetProvider>
          {children}
        </HelmetProvider>
      </ReduxProvider>
    </>
  )
}

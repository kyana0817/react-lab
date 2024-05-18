import { configureStore } from '@reduxjs/toolkit'
import counter from '@/stores/counter'
import datalist from '@/stores/datalist'


const store = configureStore({
  reducer: {
    counter,
    datalist
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '@/stores'

export type UseAppDispatchFn =  () => AppDispatch
export type UseAppSelectorFn = TypedUseSelectorHook<RootState>

type HandleTrueFn = () => void
type HandleFalseFn = () => void
type HandleToggleFn = () => void

export type UseBoolFn = (initialState?: boolean) => [
  boolean, HandleTrueFn, HandleFalseFn, HandleToggleFn
]

import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/stores'
import type { UseBoolFn  } from './useUtils.type'

// use redux hook
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

// common hook
export const useBool: UseBoolFn = (initialState = false) => {
  const [state, setState] = useState(initialState)
  const handleTrue = useCallback(() => setState(true), [])
  const handleFalse = useCallback(() => setState(false), [])
  const handleToggle = useCallback(() => setState(prev => !prev), [])

  return [
    state, handleTrue, handleFalse, handleToggle
  ]
}

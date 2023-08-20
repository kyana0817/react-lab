import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { UseAppSelectorFn, UseAppDispatchFn, UseBoolFn  } from './useUtils.type'

// use redux hook
export const useAppDispatch: UseAppDispatchFn = useDispatch
export const useAppSelector: UseAppSelectorFn = useSelector

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

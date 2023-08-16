import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CounterState {
  count: number;
  flag: boolean;
}

const initialState: CounterState = {
  count: 0,
  flag: false
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    toggle: (state) => {
      state.flag = !state.flag
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    }
  }
})

export const {
  increment,
  decrement,
  toggle,
  incrementByAmount
} = counterSlice.actions

export default counterSlice.reducer

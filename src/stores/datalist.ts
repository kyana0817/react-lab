import { PayloadAction, createSlice } from '@reduxjs/toolkit'


export type Dataitem = {
  id: number;
  text: string;
}

export type DatalistState = Dataitem[]

const initialState: DatalistState = [
  { id: 0, text: 'tanaka' },
  { id: 1, text: 'suzuki' },
  { id: 2, text: 'satou' }
]

const datalistSlice = createSlice({
  name: 'datalist',
  initialState,
  reducers: {
    modifyText: (state: DatalistState, action: PayloadAction<number>) => {
      const idx = state.findIndex(item => item.id === action.payload)
      if (idx === -1) return
      state[idx].text += '!'
    },
    modifyOrder: (state: DatalistState, action: PayloadAction<[number, number]>) => {
      const [source,target] = action.payload
      const [s, t] = [state[source], state[target]]
      if (!s || !t) return
      state[source] = t
      state[target] = s
    }
  }
})

export const { modifyText, modifyOrder } = datalistSlice.actions

export default datalistSlice.reducer

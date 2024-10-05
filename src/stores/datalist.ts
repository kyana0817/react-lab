import { PayloadAction, createSlice } from '@reduxjs/toolkit'


export type Dataitem = {
  id: number;
  text: string;
}

export type DatalistState = Dataitem[]

const initialState: DatalistState = [
  { id: 0, text: 'tanaka' },
  { id: 1, text: 'suzuki' },
  { id: 2, text: 'satou' },
  { id: 3, text: 'sato' },
  { id: 4, text: 'saito' },
  { id: 5, text: 'sakai' },
  { id: 6, text: 'sasaki' },
  { id: 7, text: 'sakamoto' },
  { id: 8, text: 'sakaguchi' },
  { id: 9, text: 'sakurai' }
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
    },
    deleteItem: (state: DatalistState, action: PayloadAction<number>) => {
      state.splice(action.payload, 1)
    }
  }
})

export const { modifyText, modifyOrder, deleteItem } = datalistSlice.actions

export default datalistSlice.reducer

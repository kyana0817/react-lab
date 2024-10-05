type HandleTrueFn = () => void
type HandleFalseFn = () => void
type HandleToggleFn = () => void

export type UseBoolFn = (initialState?: boolean) => [
  boolean, HandleTrueFn, HandleFalseFn, HandleToggleFn
]

export type Route = {
  title: string,
  path: string
}
export type Routes = Route[]

export type Group = {
  title: string,
  routes: Routes
}
export type Groups = Group[]

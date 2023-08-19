const STORAGE_PPRFIX = 'ReactLab_'

type StorageObject = {
  getItem<T extends StorageItem>(name: T): StorageTypeMap[T] | null,
  setItem<T extends StorageItem>(name: T, value: StorageTypeMap[T]): void,
}

type StorageTypeMap = {
  tabAllClose: string;
  tabCount: number;
}
type StorageItem = keyof StorageTypeMap


export const storage: StorageObject = {
  getItem(name) {
    const value = localStorage.getItem(STORAGE_PPRFIX + name)
    if (!value) return null

    return JSON.parse(value)
  },
  setItem(name, value) {
    localStorage.setItem(STORAGE_PPRFIX + name, JSON.stringify(value))
  }
}

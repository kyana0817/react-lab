import { factoryEvent } from '@/utils/event'

type ObserverEventMap = {
  notify: CustomEvent<{ids: string[]}>
}

export const createObserver = (options?: IntersectionObserverInit) => {
  const event = factoryEvent<ObserverEventMap>()

  const notify = (ids: string[]) => {
    event.dispatchEvent(new CustomEvent<{ ids: string[]; }>('notify', { detail: { ids } }))
  }

  const observer = new IntersectionObserver((entries) => {
    const ids: string[] = []
    console.log(entries)
    entries.forEach((entry) => {
      ids.push(entry.target.id)
    })
    notify(ids)
  }, options)
  
  console.log('')
  return { observer, event }
}

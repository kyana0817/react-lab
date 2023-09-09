import { factoryEvent } from '@/utils/event'

type NotifyDetail = {
  eventIds: string[];
  leaveIds: string[];
}

type ObserverEventMap = {
  notify: CustomEvent<NotifyDetail>
}

export const createObserver = (options?: IntersectionObserverInit) => {
  const event = factoryEvent<ObserverEventMap>()

  const notify = (detail: NotifyDetail) => {
    event.dispatchEvent(new CustomEvent('notify', { detail }) )
  }

  const observer = new IntersectionObserver((entries) => {
    const notifyDetail: NotifyDetail = {
      eventIds: [],
      leaveIds: [],
    }
    
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        notifyDetail.eventIds.push(entry.target.id)
      } else {
        notifyDetail.leaveIds.push(entry.target.id)
      }
    })
    notify(notifyDetail)
  }, options)
  
  return { observer, event }
}

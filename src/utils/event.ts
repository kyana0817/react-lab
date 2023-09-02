export type BaseEventMap = Record<PropertyKey, Event | CustomEvent>

interface CustomEventTarget<T extends BaseEventMap> extends EventTarget {
  addEventListener<K extends keyof T>(
    type: K,
    listener: (event: T[K]) => void, options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof T >(
    type: K,
    listener: (event: T[K]) => void,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
  dispatchEvent<K extends keyof T>(event: T[K]): boolean;
}

export const factoryEvent = <T extends BaseEventMap>() => {
  const event = new EventTarget
  return event as CustomEventTarget<T>
}

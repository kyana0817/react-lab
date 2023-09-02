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
}

type FactoryEventFn = <T extends BaseEventMap>() => CustomEventTarget<T>

const factoryEvent = <T extends BaseEventMap>() => {
  const event = EventTarget as {new(): CustomEventTarget<T>; prototype: CustomEventTarget<T>}
  return event
}

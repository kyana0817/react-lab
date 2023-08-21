import crypto from 'crypto'

type FP<T extends (...args: never[]) => unknown> =  T extends (...args: infer I) => unknown? I: never
type ActionRecord = Record<string, (...args: never[])=>unknown>

type ClientMessage<
  T extends ActionRecord,
  K extends keyof T = keyof T,
  S extends {[K2 in K]: FP<T[K]>} = {[K2 in K]: FP<T[K]>}
> =  {
  id: string;
  type: K;
  args: S[K]
}

const randomString = (len=16) => {
  return crypto.randomBytes(len)
    .toString('hex')
}

export const expose = <
  T extends ActionRecord
>(actions: T, worker: DedicatedWorkerGlobalScope) => {
  worker.onmessage = async ({ data }: MessageEvent) => {
    const { id, type, args }: ClientMessage<T> = JSON.parse(data)
    const payload = await actions[type](...args)
    worker.postMessage(JSON.stringify({ id, payload }))
  }
  return actions
}

export const useWorker = <T extends ActionRecord = ActionRecord>(worker: Worker) => {
  const postMessage = <K extends keyof T, S extends FP<T[K]>>(type: K, args: S) => {
    const id = randomString()
    worker.postMessage(JSON.stringify({
      id, type, args
    }))

    return new Promise<ReturnType<T[K]>>((resolve) => {
      worker.addEventListener('message', function callback({ data }: MessageEvent){
        const { id: reciveId, payload } = JSON.parse(data) as {
          id: string;
          payload: ReturnType<T[K]>
        }
        if (id !== reciveId) return

        worker.removeEventListener('message', callback)
        resolve(payload)
      })
    })
  }

  const terminate = () => {
    worker.terminate()
  }

  return {
    postMessage,
    terminate
  }
}

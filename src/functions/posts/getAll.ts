import { JSON_URL } from '@/functions/posts/url'
import { sleep } from '@/utils/sleep'
import type { Posts } from './type'

export const getAll = async (): Promise<Posts> => {
  await sleep(500)
  return await (await fetch(JSON_URL)).json()
}

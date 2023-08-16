import { JSON_URL } from '@/functions/posts/url'
import type { Routes } from '@/types'
import { sleep } from '@/utils/sleep'

type PagingFn = (page: number, pageNum: number) => Promise<Routes>

export const paging:PagingFn = async(page=1, pageNum=10) => {
  const data =  await (await fetch(JSON_URL)).json()
  await sleep(500)
  return data.slice(pageNum * (page-1), pageNum * page)

}

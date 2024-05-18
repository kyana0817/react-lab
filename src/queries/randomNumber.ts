import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const queryKey = ['RANDOM_NUMBER']

const sleep = async (timeNS: number) => {new Promise(resolve => setTimeout(resolve, timeNS))}

const queryFn = async () => {
  await sleep(500)
  return {
    num1: Math.random(),
    num2: Math.random(),
    num3: Math.random()
  }
}

type QueryData = Awaited<ReturnType<typeof queryFn>>

const useRandomNumber = <T = unknown>(props: {
  select?: (data: QueryData) => T
}) => {
  return useQuery({ queryKey, queryFn, staleTime: Infinity, ...props })
}

export const useRandomGetData = () => {
  const queryCilent = useQueryClient()
  return queryCilent.getQueryData<QueryData>(queryKey)
}

export const useRandomNumber1 = () => {
  return useRandomNumber({ select: data => data.num1 })
}
export const useRandomNumber2 = () => {
  return useRandomNumber({ select: data => data.num2 })
}
export const useRandomNumber3 = () => {
  return useRandomNumber({ select: data => data.num3 })
}

export const useRandomTotal = () => {
  return useRandomNumber({ select: data => data.num1 + data.num2 + data.num3 })
}

type MutationParams = {
  property: 'num1' | 'num2' | 'num3'
}

export const useModifyNumber = () => {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: async (params: MutationParams) => {
      await sleep(100)
      return { ...params, num: Math.random() }
    },
    onSuccess: data => {
      const old = queryClient.getQueryData<QueryData>(queryKey)
      queryClient.setQueryData(queryKey, {
        ...old,
        [data.property]: data.num
      })
    }    
  })
  return mutation
}

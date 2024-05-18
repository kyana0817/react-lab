import React, { useEffect, useState } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from '@/hooks/useUtils'
import { modifyOrder, modifyText } from '@/stores/datalist'

const Item = React.memo((props: {idx: number}) => {
  const { idx } = props
  const text = useAppSelector(state => state.datalist[idx].text)
  useEffect(() => {
    console.log(idx, text)
  })

  return <p>{text}</p>
})

Item.displayName = 'Item'

const List = (props: {ids: number[]}) => {
  const { ids } = props

  return (
    <>
      {ids.map((id, idx) => (
        <Item
          key={id}
          idx={idx}
        />
      ))}
    </>
  )
}

List.displayName = 'List'

const Test = () => {
  const ids = useAppSelector(state => state.datalist.map(item => item.id), shallowEqual)
  return <List ids={ids}/>
}

const ModifyText = () => {
  const dispatch = useAppDispatch()
  const [idx, setIdx] = useState(0)
  const handleClick = () => dispatch(modifyText(idx))
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setIdx(Number(event?.target.value))

  return (
    <div className='flex gap-1'>
      <input
        type="number"
        value={idx}
        onChange={handleChange}
      />
      <button onClick={handleClick}>modify</button>
    </div>
  )
}

const ModifyOrder = () => {
  const dispatch = useAppDispatch()
  const [select, setSelect] = useState<[number, number]>([0,1])
  const handleClick = () => dispatch(modifyOrder(select))
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    const idx = name === 'source'? 0: 1
    setSelect(prev => {
      const update: [number, number] = [...prev]
      update[idx] = Number(value)
      return update
    })
  }

  return (
    <div className='flex gap-1'>
      <input
        type="number"
        name="source"
        value={select[0]}
        onChange={handleChange}
      />
      <input
        type="number"
        name="target"
        value={select[1]}
        onChange={handleChange}
      />
      <button onClick={handleClick}>modify</button>
    </div>
  )
}

export const Datalist = () => {
  return (
    <>
      <h2>Redux Datalist Context</h2>
      <div>
        <Test/>
      </div>
      <ModifyText/>
      <ModifyOrder/>
    </>
  )
}

import { useId, useState } from 'react'
import { useRandomNumber1, useRandomNumber2, useRandomNumber3, useModifyNumber, useRandomTotal, useRandomGetData } from '@/queries/randomNumber'

const Number1 = () => {
  const { data } = useRandomNumber1()
  return (
    <p>{`number1: ${data}`}</p>
  )
}
const Number2 = () => {
  const { data } = useRandomNumber2()
  return (
    <p>{`number2: ${data}`}</p>
  )
}
const Number3 = () => {
  const { data } = useRandomNumber3()
  return (
    <p>{`number3: ${data}`}</p>
  )
}

const NumberData = () => {
  const data = useRandomGetData()
  return (
    <>
      {data? (
        <>
          <p>{`data number1: ${data.num1}`}</p>
          <p>{`data number2: ${data.num2}`}</p>
          <p>{`data number3: ${data.num3}`}</p>
        </>
      ): (
        <p>undefined</p>
      )}
    </>
  )
}

const NumberTotal = () => {
  const { data } = useRandomTotal()
  return (
    <p>{`total: ${data}`}</p>
  )
}

const ModifyButton = () => {
  const mutation = useModifyNumber()
  const [property, setProperty] = useState<'num1'| 'num2'| 'num3'>('num1')
  const id =  useId()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutation.mutate({ property })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label>
          property:
          <select
            className="ml-2"
            name="modifies"
            id={id}
            value={property}
            onChange={(e) => setProperty(e.target.value as 'num1'| 'num2'| 'num3')}
          >
            <option value="num1">number1</option>
            <option value="num2">number2</option>
            <option value="num3">number3</option>
          </select>
        </label>
      </div>
      <div>
        <button>
          modify
        </button>
      </div>
    </form>
  )
}

export const RandomNumber = () => {
  return (
    <>
      <h2>Tanstack RandomNumber Context</h2>
      <div className='mb-2'>
        <Number1/>
        <Number2/>
        <Number3/>
        <NumberTotal/>
      </div>
      <div className='mb-2'>
        <NumberData/>
      </div>
      <div>
        <ModifyButton/>
      </div>
    </>
  )
}

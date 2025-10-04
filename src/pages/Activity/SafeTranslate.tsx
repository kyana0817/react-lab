import { Activity, useState } from 'react'


export const SafeTranslate = () => {
  const [activity, setActivity] = useState(false)
  return (
    <>
      <h2>SafeTranslate</h2>
      <div>
        <button onClick={() => setActivity(prev => !prev)}>
          {activity ? 'hidden' : 'visible'}
        </button>
      </div>
      <Activity mode={activity ? 'hidden': 'visible'}>
        Sample text.
      </Activity>
    </>
  )
}

export const NoStateRendering = () => {
  let count = 0

  return (
    <>
      <h2>
        No state
      </h2>
      <div>
        state value:
        {count}
      </div>
      <div className="flex gap-2">
        <button onClick={() => --count}>
          -1
        </button>
        <button onClick={() => ++count}>
          +1
        </button>
      </div>
    </>
  )
}

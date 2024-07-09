'use server'


const { increment } = (() => {
  let count = 0
  return {
    increment: () => ++count
  }
})()

export default async function incrementLike() {
  return increment()
}

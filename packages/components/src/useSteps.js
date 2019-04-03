import { useContext, useEffect } from 'react'
import { Context } from './context'

export default length => {
  const { register, index, step } = useContext(Context)
  console.log('useSteps', index, step)

  useEffect(() => {
    if (typeof register !== 'function') return
    register(index, length)
  }, [length])

  return step
}

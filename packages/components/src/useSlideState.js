import { useState, useMemo } from 'react'

import useArrowKeys from './useArrowKeys'
import useIndex from './useIndex'

export default function useSlideState(
  history,
  url,
  pathname,
  initialIndex,
  slides
) {
  const [index, setIndex] = useIndex(history, url, pathname, initialIndex)

  const initSteps = useMemo(
    function initSteps() {
      const keys = [...Array(slides.length).keys()]
      return keys.reduce(function buildSteps(steps, key) {
        return { ...steps, [key]: 0 }
      }, {})
    },
    [slides]
  )
  const [steps, registerSteps] = useState(initSteps)
  const [step, setStep] = useState(0)

  function register(index, numOfSteps) {
    registerSteps({
      ...steps,
      [index]: numOfSteps,
    })
  }

  function next() {
    if (steps[index] > 0 && step < steps[index]) {
      setStep(step + 1)
    } else {
      setStep(0)
      setIndex(index + 1)
    }
  }

  function previous() {
    if (steps[index] > 0 && step > 0) {
      setStep(step - 1)
    } else {
      setStep(steps[index - 1])
      setIndex(index - 1)
    }
  }

  useArrowKeys(next, previous)

  return [index, step, register, steps]
}

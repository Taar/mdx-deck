import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Route, withRouter } from 'react-router-dom'
import { Swipeable } from 'react-swipeable'

import Slide from './Slide'
import useArrowKeys from './useArrowKeys'

function Normal(props) {
  const { slides, history, match, location } = props
  console.log(match, location)

  const pathIndex = location.pathname.split('/')[1]
  const initialIndex =
    pathIndex != null && pathIndex.length !== 0 ? parseInt(pathIndex) : 0

  const [index, setIndex] = useState(initialIndex)

  useEffect(
    function pushHistory() {
      history.push(`/${index}`)
    },
    [index]
  )

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

  const context = {
    step,
    register,
  }

  return (
    <Swipeable onSwipedRight={() => {}} onSwipedLeft={() => {}}>
      {slides.map((Component, i) => (
        <Route
          key={i}
          exact
          path={i === 0 ? [`/${i}`, `/`] : `/${i}`}
          render={() => (
            <Slide index={i} {...context}>
              <Component />
            </Slide>
          )}
        />
      ))}
    </Swipeable>
  )
}

Normal.propTypes = {
  slides: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(Normal)

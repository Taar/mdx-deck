import React from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter } from 'react-router-dom'

import Zoom from './Zoom'
import Slide from './Slide'
import Pre from './Pre'
import Clock from './Clock'

import useSlideState from './useSlideState'

function Presenter(props) {
  const { slides, history, match, location } = props
  // We know the mode because this component is rendering

  const pathIndex = parseInt(location.pathname.split('/')[2])
  const initialIndex =
    pathIndex != null && Number.isInteger(pathIndex) ? pathIndex : 0

  console.log('Path', pathIndex, initialIndex)

  const [index, step, register, steps] = useSlideState(
    history,
    match.path,
    location.pathname,
    initialIndex,
    slides
  )

  let Next = slides[index]
  let nextStep = step + 1
  let nextIndex = index

  if (steps[index] == 0 || step + 1 > steps[index]) {
    nextStep = 0
    // TODO: check to make sure there is a next slide
    nextIndex = index + 1
    Next = slides[nextIndex]
  }

  const notes = []

  const context = {
    step,
    register,
  }

  const nextContext = {
    step: nextStep,
  }

  return (
    <div
      style={{
        color: 'white',
        backgroundColor: 'black',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <div
        style={{
          marginTop: 'auto',
          marginBottom: 'auto',
          display: 'flex',
        }}
      >
        <div
          style={{
            width: 500 / 8 + '%',
            minWidth: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Zoom zoom={5 / 8}>
            {slides.map((Component, i) => (
              <Route
                key={i}
                exact
                path={i === 0 ? [`/presenter/${i}`, `/`] : `/presenter/${i}`}
                render={() => (
                  <Slide index={i} {...context}>
                    <Component />
                  </Slide>
                )}
              />
            ))}
          </Zoom>
        </div>
        <div
          style={{
            width: 100 / 4 + '%',
            minWidth: 0,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Zoom zoom={1 / 4}>
            <Slide index={nextIndex} {...nextContext}>
              <Next />
            </Slide>
          </Zoom>
          <Pre>{notes}</Pre>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: 16,
        }}
      >
        <Pre>
          {index} of {slides.length - 1}
        </Pre>
        <div style={{ margin: 'auto' }} />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={''}
          style={{
            color: 'inherit',
          }}
        >
          Open New Window
        </a>
        <div style={{ margin: 'auto' }} />
        <Clock />
      </div>
    </div>
  )
}

Presenter.propTypes = {
  slides: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export default withRouter(Presenter)

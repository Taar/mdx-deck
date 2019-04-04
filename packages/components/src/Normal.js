import React, { useState, useMemo, useEffect } from 'react'
import PropTypes from 'prop-types'

import { Route, withRouter } from 'react-router-dom'
import { Swipeable } from 'react-swipeable'

import Slide from './Slide'
import useSlideState from './useSlideState'

function Normal(props) {
  const { slides, history, match, location } = props
  console.log('Normal', match, location)

  const pathIndex = location.pathname.split('/')[1]
  const initialIndex =
    pathIndex != null && pathIndex.length !== 0 ? parseInt(pathIndex) : 0

  const [index, step, register] = useSlideState(
    history,
    match.path,
    location.pathname,
    initialIndex,
    slides
  )

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

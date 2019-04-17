import React from 'react'
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

  const [, step, register] = useSlideState(
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

  /*
  The simple answer to why the first slide is being rendered by not shown is
  because the first slide hold (or can hold, more on that later) the Head tag
  which is used to set meta tags in the head of the document. If the first slide
  get unmounted the meta tags get removed. For more information see the Head
  component.

  If the Head is used anywhere else but on the first slide, it will only get
  rendered/placed in the head tag while that slide is visible.
  */
  const [FirstSlide] = slides

  return (
    <Swipeable onSwipedRight={() => {}} onSwipedLeft={() => {}}>
      {/* See the comment at the definition of FirstSlide to get
          an understanding of why */}
      <Slide hide index={0} {...{ step: 0 }}>
        <FirstSlide />
      </Slide>
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

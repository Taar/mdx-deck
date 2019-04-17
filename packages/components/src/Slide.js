import React from 'react'
import styled from '@emotion/styled'
import Root from './Root'
import { Context } from './context'

const SlideRoot = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    width: '100vw',
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  props => props.theme.Slide
)

export const Slide = ({ children, ...props }) => {
  return (
    <Context.Provider value={props}>
      <Root>
        <SlideRoot style={{ display: props.hide ? 'none' : 'auto' }}>
          {children}
        </SlideRoot>
      </Root>
    </Context.Provider>
  )
}

Slide.DefaultProps = {
  hide: false,
}

export default Slide

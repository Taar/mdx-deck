import React, { useEffect, useContext } from 'react'
import { Context } from './context'
import styled from '@emotion/styled'

const HiddenNotes = styled.div({ display: 'none' })

export function Notes({ children }) {
  const context = useContext(Context)
  useEffect(() => {
    console.log('NOTES useEffect ran')
    if (
      Number.isInteger(context.index) &&
      typeof context.registerNotes === 'function'
    ) {
      context.registerNotes(context.index, children)
    }
  })

  return <HiddenNotes>{children}</HiddenNotes>
}

export default Notes

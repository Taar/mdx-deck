import React, { useState, useContext, useEffect } from 'react'
import { createPortal } from 'react-dom'

// ok maybe use the slide context for this?? like only render the head
// component if the context tells you too which would only be the first
// render slide
export const HeadContext = React.createContext({
  rendered: false,
  update() {
    console.warn('Not implemented by Provider')
  },
})

export const HeadProvider = ({ tags = [], children }) => {
  console.log('tags?', tags)
  const [rendered, setRendered] = useState(false)
  const context = {
    rendered,
    setRendered,
  }
  return <HeadContext.Provider value={context}>{children}</HeadContext.Provider>
}

export function Head(props) {
  console.log('HEAD render')
  const { rendered, setRendered } = useContext(HeadContext)

  useEffect(() => {
    const title = document.head.querySelector('title')
    if (title) {
      setRendered(true)
    }
  }, [rendered, setRendered])

  const children = React.Children.toArray(props.children).map(child =>
    React.cloneElement(child, {
      'data-head': true,
    })
  )

  return createPortal(children, document.head)
}

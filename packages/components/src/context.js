import React, { useContext } from 'react'

export const Context = React.createContext({})

export const withContext = Component => props => (
  <Context.Consumer>
    {context => <Component {...props} context={context} />}
  </Context.Consumer>
)

export const useDeck = () => useContext(Context)

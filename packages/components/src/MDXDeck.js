import React from 'react'
import PropTypes from 'prop-types'

import {
  BrowserRouter as Router,
  Route,
  withRouter,
  Switch,
} from 'react-router-dom'

import Provider from './Provider'
import Normal from './Normal'
import Presenter from './Presenter'
import Overview from './Overview'
import Grid from './Grid'
// Need to figure out what this does
import Print from './Print'
import GoogleFonts from './GoogleFonts'
import Catch from './Catch'

import useNavigation from './useNavigation'

function Navigation({ history, location, children }) {
  useNavigation(history, location)
  return <>{children}</>
}

Navigation.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
}

const KeyPressNavigation = withRouter(Navigation)

export function MDXDeck(props) {
  const { slides } = props

  // How to set a global mode of sorts
  const mode = 'normal'
  const currentIndex = 0
  return (
    <Provider {...props} mode={mode} index={currentIndex}>
      <Catch>
        <Router>
          <KeyPressNavigation>
            <Switch>
              <Route
                path={['/presenter', '/presenter/:index']}
                render={() => <Presenter slides={slides} />}
              />
              <Route path="/overview" component={() => <p>overview</p>} />
              <Route path="/grid" component={() => <p>grid</p>} />
              <Route
                path={['/', '/:index']}
                render={() => <Normal slides={slides} />}
              />
              {/* TODO: view not found component */}
            </Switch>
          </KeyPressNavigation>
        </Router>
        <GoogleFonts />
      </Catch>
    </Provider>
  )
}

MDXDeck.propTypes = {
  slides: PropTypes.array.isRequired,
  headTags: PropTypes.array.isRequired,
}

MDXDeck.defaultProps = {
  slides: [],
  headTags: [],
}

export default MDXDeck

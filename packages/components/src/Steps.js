import React from 'react'
import { withContext } from './context'

export const Steps = withContext(
  class extends React.Component {
    constructor(props) {
      super(props)
      const { registerSteps, index } = props.context
      const { length } = props
      if (typeof registerSteps !== 'function') return
      registerSteps(index, length)
    }
    render() {
      const { context, render } = this.props
      const { step } = context
      return render({ step })
    }
  }
)

export default Steps

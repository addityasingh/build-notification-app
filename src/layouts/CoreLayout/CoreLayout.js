import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import './CoreLayout.scss'
import '../../styles/core.scss'

export class CoreLayout extends Component {
  render () {
    const { children } = this.props
    return (
      <div className='container text-center'>
        <AppBar title='Build notifications'/>
        <div className='core-layout__viewport'>
          {children}
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired
}

export default CoreLayout

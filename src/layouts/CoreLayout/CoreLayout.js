import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import firebase from 'firebase';
import './CoreLayout.scss'
import '../../styles/core.scss'

export class CoreLayout extends Component {
  logout () {
		firebase.auth().signOut().then(function() {
		// Sign-out successful.
		}, function(error) {
		// An error happened.
		});
	}

  render () {
    const { children } = this.props
    return (
      <div className='container text-center'>
        <AppBar title='Build notifications' 
          iconElementRight={<FlatButton label="logout" onClick={this.logout}/>}
          />
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

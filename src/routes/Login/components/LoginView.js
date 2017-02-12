import React, { Component } from 'react'
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import { browserHistory } from 'react-router'
import { darkBlack } from 'material-ui/styles/colors'
import { getGithubUserByToken } from '../../../api/github-api'
import './LoginView.scss'

class LoginView extends Component {
	state = { data: []};

	loginWithPopup () {
		const provider = new firebase.auth.GithubAuthProvider()
		const { dispatch } = this.props.store	
		firebase.auth().signInWithPopup(provider).then((result) => {
			const { user, credential: { accessToken } } = result
			dispatch({
				type: 'GITHUB_TOKEN_UPDATE',
				payload: accessToken
			})

			getGithubUserByToken(accessToken).then(user => {
				dispatch({
					type: 'USER_UPDATE',
					payload: user
				})
				browserHistory.push('/home');
			})
			
		})
		.catch(err => console.log(err))
	}

	render () {
		const { data } = this.state

		return (<div>
            <h2>LoginView</h2>
			<div>
				<div onClick={() => this.loginWithPopup()}>Login</div>
			</div>
        </div>)
	}
}

export default LoginView

import React, { Component } from 'react'
import firebase from 'firebase'
import { darkBlack } from 'material-ui/styles/colors'
import './LoginView.scss'

class LoginView extends Component {
	state = { data: []};

	renderSignInOptions () {
		var uiConfig = {
			signInSuccessUrl: 'https://build-notification-app.firebaseapp.com/home',
			signInOptions: [
			// Leave the lines as is for the providers you want to offer your users.
				firebase.auth.GoogleAuthProvider.PROVIDER_ID,
				firebase.auth.TwitterAuthProvider.PROVIDER_ID,
				firebase.auth.GithubAuthProvider.PROVIDER_ID,
				firebase.auth.EmailAuthProvider.PROVIDER_ID
			],
			// Terms of service url.
			tosUrl: '',
			callbacks: {
				signInSuccess: () => true
			}
		};

		// Initialize the FirebaseUI Widget using Firebase.
		const ui = new firebaseui.auth.AuthUI(firebase.auth());
		// The start method will wait until the DOM is loaded.
		ui.start('#firebaseui-auth-container', uiConfig);
	}

	render () {
		const { data } = this.state

		return (<div>
            <h2>LoginView</h2>
			<div>
				<div id={'firebaseui-auth-container'}></div>
				{
					this.renderSignInOptions()
				}
			</div>
        </div>)
	}
}

export default LoginView

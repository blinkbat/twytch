

import React from 'react';

import googleClientId from '../env';


class GoogleAuth extends React.Component {

	state = { isSignedIn: null };



	componentDidMount() {

		// google api lib call
		window.gapi.load( 'client:auth2', () => {

			window.gapi.client.init({ 

				clientId: googleClientId, 
				scope: 'email'

			}).then( () => {

				this.auth = window.gapi.auth2.getAuthInstance();

				this.setState( { isSignedIn: this.auth.isSignedIn.get() } );

				this.auth.isSignedIn.listen( this.onAuthChange );

			});

		});

	}



	onAuthChange = () => {

		this.setState( { isSignedIn: this.auth.isSignedIn.get() } );

	};


	onSignInClick = () => {
		this.auth.signIn();
	};


	onSignOutClick = () => {
		this.auth.signOut();
	};


	renderAuthButton() {

		if( this.state.isSignedIn === null ) {
			return <div><small>Waiting...</small></div>;

		} else if ( this.state.isSignedIn ) {
			return (

				// note that we don't use the () invoke onClick
				// else this method would be called on page load
				<button className="ui red google button"
					onClick={ this.onSignOutClick }>
					<i className="google icon" />
					Sign Out
				</button>

			);

		} else {
			return (

				<button className="ui blue google button"
					onClick={ this.onSignInClick }>
					<i className="google icon" />
					Sign In
				</button>

			);

		}

	}



	render() {
		return <div>{ this.renderAuthButton() }</div>;
	}


}


export default GoogleAuth;



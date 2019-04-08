


// dependencies
import React from 'react';
import { connect } from 'react-redux';

// actions
import { signIn, signOut } from '../actions';

// env vars
import googleClientId from '../env';



class GoogleAuth extends React.Component {

	componentDidMount() {

		// google api lib call
		window.gapi.load( 'client:auth2', () => {

			window.gapi.client.init({ 

				clientId: googleClientId, 
				scope: 'email'

			}).then( () => {

				// create auth instance
				this.auth = window.gapi.auth2.getAuthInstance();

				// get isSignedIn status
				this.onAuthChange( this.auth.isSignedIn.get() );

				this.auth.isSignedIn.listen( this.onAuthChange );

			});

		});

	}



	// simple switch to detect auth status
	onAuthChange = ( isSignedIn ) => {
		if( isSignedIn ) {
			this.props.signIn( this.auth.currentUser.get().getId() );
		} else {
			this.props.signOut();
		}
	};

	// fire signin
	onSignInClick = () => {
		this.auth.signIn();
	};

	// fire signout
	onSignOutClick = () => {
		this.auth.signOut();
	};



	renderAuthButton() {

		if( this.props.isSignedIn === null ) {
			return (
				<button className="ui grey google button">
					<i className="google icon" />
					Waiting...
				</button>
			);

		} else if ( this.props.isSignedIn ) {
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



} // end class


const mapStateToProps = ( state ) => {

	return { isSignedIn: state.auth.isSignedIn };

}



export default connect( 
	mapStateToProps, 
	{ signIn, signOut } 
)( GoogleAuth );





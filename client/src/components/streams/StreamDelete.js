

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Modal from '../Modal';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';



class StreamDelete extends React.Component {

	componentDidMount() {

		const streamId = this.props.match.params.id;

		this.props.fetchStream( streamId );

	}



	renderActions() {

		const streamId = this.props.match.params.id;

		// our variable JSX to pass buttons (actions) to modal
		// using React.Fragment to avoid UI hiccups!
		// shorthand is <> and </>, may be caught by linters
		return (

			<React.Fragment>

				<button 
					className="ui button negative"
					onClick={ () => this.props.deleteStream( streamId ) }
				>
					Delete
				</button>

				<Link to="/" className="ui button">
					Cancel
				</Link>

			</React.Fragment>

		);
	}



	renderContent() {

		if( !this.props.stream ) {
			return "Are you absolutely, immovably sure?";
		}

		return (
			<div>
				<p><strong>Stream title:</strong> { this.props.stream.title }</p>
				<p><strong>Stream description:</strong> { this.props.stream.description }</p>
				<small>Are you absolutely, immovably sure?</small>
			</div>
			);
	}



	render() {

		return (
				<Modal 
					title="😥 Why Would You Delete Me?"
					content={ this.renderContent() }
					actions={ this.renderActions() }
					onDismiss={ () => history.push( '/' ) }
				/>
		);
	}

} // end class



const mapStateToProps = ( state, ownProps ) => {

	// note that ownProps is same props obj
	// that gets passed to our component
	//console.log( ownProps );

	return { 
		// ownProps.match.params.id = id of stream from URL
		stream: state.streams[ ownProps.match.params.id ] 
	};

}



export default connect(
	mapStateToProps,
	{ fetchStream, deleteStream }
)(StreamDelete);







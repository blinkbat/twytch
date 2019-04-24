

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';


class StreamList extends React.Component {

	componentDidMount() {
		this.props.fetchStreams();
	}



	renderAdmin( stream ) {

		if( stream.userId === this.props.currentUserId ) {
			return (
				<div className="right floated content">

					<Link 
						className="ui button primary"
						to={ `/streams/edit/${ stream.id }` }
					>
						Edit
					</Link>

					<Link 
						className="ui button negative"
						to={ `/streams/delete/${ stream.id }` }
					>
						Delete
					</Link>

				</div>
			);
		}

	}



	renderList() {

		return this.props.streams.map( stream => {

			// note that we need to call renderAdmin() first
			// due to how semantic-css works. :rolleyes:
			return (
				<div 
					className="item" 
					key={ stream.id } 
					style={{ padding: '10px' }}
				>

					<div>
						{ this.renderAdmin( stream ) }
					</div>

					<i 
						className="large middle aligned icon camera" 
						style={{ paddingRight: '10px' }} 
					/>

					<div className="content">
						<Link to={ `/streams/${stream.id}` }>
							<h3>{ stream.title }</h3>
						</Link>

						<div className="description">
							{ stream.description }
						</div>
					</div>

				</div>
			);

		});
	}



	renderCreateBtn() {

		if( this.props.isSignedIn ) {

			return (
				<div style={{ textAlign: 'right' }}>
					<Link to="/streams/new" className="ui button green">
						Create Stream
					</Link>
				</div>
			);

		}

	}



	render() {
		return (
			<div>
				<h2>Streams</h2>

				<div className="ui celled list">
					{ this.renderList() }
				</div>

				{ this.renderCreateBtn() }

			</div>
		);
	}

} // end class



const mapStateToProps = state => {

	// built-in JS to convert obj to arr
	// this decreases our dependency on lodash,
	// though we COULD use lodash to iterate the obj
	return { 
		streams: 				Object.values( state.streams ), 
		currentUserId: 	state.auth.userId,
		isSignedIn:  		state.auth.isSignedIn 
	};

}


export default connect( 
	mapStateToProps, 
	{ fetchStreams } 
)( StreamList );









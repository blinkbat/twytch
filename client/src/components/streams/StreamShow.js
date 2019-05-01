

import React from 'react';
import { connect } from 'react-redux';

import flv from 'flv.js';

import { fetchStream } from '../../actions';

class StreamShow extends React.Component {

	// using constructor to create a ref
	// to our video element in render()
	constructor( props ) {

		super( props );

		this.videoRef = React.createRef(); 

	}



	componentDidMount() {

		const streamId = this.props.match.params.id;

		this.props.fetchStream( streamId );

		this.buildPlayer();

	}



	// call buildPlayer() on any render()
	componentDidUpdate() {
		this.buildPlayer();
	}



	// destruct player on component unmount
	componentWillUnmount() {
		this.player.destroy();
	}



	buildPlayer() {

		// if we have a player or don't have stream info
		// do not attempt to build
		if( this.player || !this.props.stream ) {
			return;
		}

		// else, begin player build process
		const streamId = this.props.match.params.id;

		// setup flv player
		this.player = flv.createPlayer({

			type: 'flv',
			url: `http://localhost:8000/live/${ streamId }.flv`

		});

		// attach to ref for video element & load it up
		this.player.attachMediaElement( this.videoRef.current );
		this.player.load();

	}



	render() {
		if( !this.props.stream ) {
			return <div>Loadin'...</div>;
		}

		// pull out properties from stream object
		const { title, description } = this.props.stream;

		return (
			<div style={{ paddingBottom: '50px' }}>

				<video 
					ref={ this.videoRef }
					style={{ width: '100%' }}
					controls
				/>

				<h1>{ title }</h1>
				<p>{ description }</p>

			</div>
		);
	}



} // end class

const mapStateToProps = ( state, ownProps ) => {
	return { stream: state.streams[ ownProps.match.params.id ] };
};

export default connect(
	mapStateToProps,
	{ fetchStream }
)( StreamShow );

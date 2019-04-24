

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';

import StreamForm from './StreamForm';



class StreamEdit extends React.Component {

	// fetch given stream from match params
	// as SOON as this component loads up
	componentDidMount() {

		const streamId = this.props.match.params.id;

		this.props.fetchStream( streamId );

	}



	onSubmit = formVals => {

		const streamId = this.props.match.params.id;

		this.props.editStream( streamId, formVals );
		
	}



	render() {

		if( !this.props.stream ) { 
			return <div>Loading stream...</div>; 
		}

		// here we pass in our onSubmit cb...
		// also initial formVals, taken directly from stream obj
		// we use lodash to pick out certain values
		return( 
			<div>

				<h2>Edit Dis Stream</h2>

				<StreamForm 
					onSubmit={ this.onSubmit } 
					initialValues={ _.pick( this.props.stream, 'title', 'description' ) }
				/>

			</div>
		);

	}

}



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
	{ fetchStream, editStream }
)( StreamEdit );










import React from 'react';
import { connect } from 'react-redux';
// Field is capitalized because it's a component
import { Field, reduxForm } from 'redux-form';

import { createStream } from '../../actions';



class StreamCreate extends React.Component {

	renderError( { touched, error } ) {

		if( touched && error ) {

			return(

				<div className="ui error message">
					<div>{ error }</div>
				</div>

			);

		}

	}

	// access input properties & label & metas from props
	renderInput = ( { input, label, meta } ) => {

		const className = `field ${ meta.error && meta.touched ? 'error' : '' }`;

		// new syntax for doing the same as block below it...
		// take all props and bind them to input element
		return(
			<div className={ className }>
				<label>{ label }</label>
				<input { ...input } autoComplete="off" />
				{ this.renderError( meta ) }
			</div>
		);

		// return (
		// 	<input 
		// 		onChange={ formProps.input.onChange } 
		// 		value={ formProps.input.value }
		// 	/>
		// );

	}



	onSubmit = formVals => {

		this.props.createStream( formVals );

	}



	render() {
		// redux-form returns an insane amount of props
		//console.log( this.props );
		return(


			<form 
				className="ui form error"
				// syntax for redux-form submit handler
				onSubmit={ this.props.handleSubmit( this.onSubmit ) }
			>

				<Field 
					name="title" 
					component={ this.renderInput } 
					label="Title:" 
				/>

				<Field 
					name="description" 
					component={ this.renderInput } 
					label="Description:" 
				/>

				<button className="ui button primary">Submit</button>

			</form>

		);
	}



} // end class

// define validate outside of class
const validate = ( formVals ) => {

	const errors = {};

	if( !formVals.title ) {
		errors.title = "Enter a title.";
	}

	if( !formVals.description ) {
		errors.description = "Enter a description.";
	}

	return errors;

};


// syntax for hooking up redux-form and react-redux
const formWrapped = reduxForm({
	form: 'streamCreate',
	// equivalent to validate: validate
	validate
})( StreamCreate );

export default connect( null, { createStream } )( formWrapped );




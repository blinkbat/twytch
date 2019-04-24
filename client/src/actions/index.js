
// import custom history file in order to
// circumvent automatic history via BrowserRouter
import history from '../history';

// import connection to streams db
import streams from '../apis/streams';

// import action types
import { 

	SIGN_IN, 
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	EDIT_STREAM,
	DELETE_STREAM

} from './types';



// LOGIN ACTION CREATORS
export const signIn = userId => {
	return { 
		type: 		SIGN_IN,
		payload: 	userId
	};
}

export const signOut = () => {
	return { 
		type: 		SIGN_OUT
	};
}



// STREAM ACTION CREATORS
export const createStream = formVals => {

	// returns two built-in react funcs: dispatch and getState
	// dispatch allows us to send the payload
	// getState allows us to reach into state for add'l logic
	return async ( dispatch, getState ) => {

		// destructure out userId from state.auth
		const { userId } = getState().auth;

		// add in userId property to our response obj
		const response = await streams.post( '/streams', { ...formVals, userId } );

		// data comes from axios response
		dispatch( { type: CREATE_STREAM, payload: response.data } ); 

		// programmatic navigation to send user back to streams index
		history.push( '/' );

	}

};



// shorthand syntax for above
export const fetchStreams = () => async dispatch => {

	const response = await streams.get( '/streams' );

	dispatch( { type: FETCH_STREAMS, payload: response.data } );

};



export const fetchStream = id => async dispatch => {

	const response = await streams.get( `/streams/${ id }` );

	dispatch( { type: FETCH_STREAM, payload: response.data } );

};



export const editStream = ( id, formVals ) => async dispatch => {

	// we use patch instead of put to avoid
	// deleting values we don't include in the req
	const response = await streams.patch( `/streams/${ id }`, formVals );

	dispatch( { type: EDIT_STREAM, payload: response.data } );

	// programmatic navigation to send user back to streams index
	history.push( '/' );

};



export const deleteStream = id => async dispatch => {

	await streams.delete( `/streams/${ id }` );

	dispatch( { type: DELETE_STREAM, payload: id } );

	// programmatic navigation to send user back to streams index
	history.push( '/' );

}






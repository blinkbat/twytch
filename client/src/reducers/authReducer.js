

// use var action types to throw err if typo'd 
import { SIGN_IN, SIGN_OUT } from '../actions/types';



// all caps const signals "true const, do not modify"
const INITIAL_STATE = { 
	isSignedIn: null,
	userId: 		null 
};


// set our initial state on load
export default ( state = INITIAL_STATE, action ) => {

	switch( action.type ) {

		// if action is sign in, pass userId from payload
		case SIGN_IN:
			return { 
				...state, 
				isSignedIn: true,
				userId: 		action.payload
			};

		// on sign out, reset userId to null
		case SIGN_OUT: 
			return { 
				...state, 
				isSignedIn: false,
				userId: 		null
			};

		default: 
			return state;

	}

};





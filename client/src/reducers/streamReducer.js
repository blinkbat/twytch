
import _ from 'lodash';

import {
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
} from '../actions/types';



export default ( state = {}, action ) => {

	switch( action.type ) {

		case FETCH_STREAMS:
			// use lodash's mapKeys to map objects to new arr
			// returns master arr keyed by id of nested objs
			return { ...state, ..._.mapKeys( action.payload, 'id' ) }

		// can I do a fall-thru here?? NO. react hates fall-thru
		case FETCH_STREAM:
			return { 
				...state, 
				[ action.payload.id ]: action.payload
			};

		case CREATE_STREAM:
			return {
				...state,
				[ action.payload.id ]: action.payload
			};

		case EDIT_STREAM:
			return {
				...state,
				[ action.payload.id ]: action.payload
			};

		case DELETE_STREAM:
			return _.omit( state, action.payload );

		default: 
			return state;

	}

};




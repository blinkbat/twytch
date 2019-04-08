


import { combineReducers } from 'redux';

// syntax to rename import for readability
// (renaming reducer to less-generic formReducer)
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import streamReducer from './streamReducer';



export default combineReducers({

	auth: 		authReducer,
	streams: 	streamReducer,
	form: 		formReducer

});
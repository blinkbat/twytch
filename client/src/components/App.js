

// import from packages
import React from 'react';

// notes on BROWSER ROUTER, HASH ROUTER, MEMORY ROUTER
// browser - everything after domain root path
// hash - everything after a hash
// memory - doesn't use URL
import { Router, Route } from 'react-router-dom';

// import from components
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';

import Header from './Header';

// import custom history file in order to
// circumvent automatic history via BrowserRouter
import history from '../history';


const App = () => {

	return (

		<div>

			<Router history={ history }>

			<Header />

				<div className="ui container">
					<Route path="/" exact component={ StreamList } />
					<Route path="/streams/new" component={ StreamCreate } />
					<Route path="/streams/edit/:id" component={ StreamEdit } />
					<Route path="/streams/delete/:id" component={ StreamDelete } />
					<Route path="/streams/show" component={ StreamShow } />
				</div>
				
			</Router>

		</div>

	);

};




export default App;





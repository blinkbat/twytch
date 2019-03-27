

// import from packages
import React from 'react';

// notes on BROWSER ROUTER, HASH ROUTER, MEMORY ROUTER
// browser - everything after domain root path
// hash - everything after a hash
// memory - doesn't use URL
import { BrowserRouter, Route } from 'react-router-dom';

// import from components
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';

import Header from './Header';


const App = () => {

	return (

		<div>

			<BrowserRouter>

			<Header />

				<div>
					<Route path="/" exact component={ StreamList } />
					<Route path="/streams/new" component={ StreamCreate } />
					<Route path="/streams/edit" component={ StreamEdit } />
					<Route path="/streams/delete" component={ StreamDelete } />
					<Route path="/streams/show" component={ StreamShow } />
				</div>
				
			</BrowserRouter>

		</div>

	);

};




export default App;





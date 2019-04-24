

import React from 'react';
import { Link } from 'react-router-dom';

import GoogleAuth from './GoogleAuth';

const Header = () => {

	return (
		<div className="ui secondary pointing menu" style={{ padding: '8px' }}>

			<Link to="/" className="item" style={{ fontWeight: '900' }}>
				Twytch
			</Link>

			<div className="right menu">

				<Link to="/" className="item">
					Streams
				</Link>

				<GoogleAuth className="item" />

			</div>

		</div>
	);

}

export default Header;



import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {

	return (
		<div className="ui secondary pointing menu">

			<Link to="/" className="item">
				Twytch
			</Link>

			<div className="right menu">

				<Link to="/" className="item">
					Streams
				</Link>

				<Link to="/login" className="item">
					Login with Google
				</Link>

			</div>

		</div>
	);

}

export default Header;

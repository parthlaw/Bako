import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const RoomName = ({ room }) => {
	const [ name, setName ] = useState(null);
	useEffect(() => {
		setName(Cookies.get('username'));
	});
	return (
		<Link to={`/chat?name=${name}&room=${room}`}>
			<span>{room}</span>
		</Link>
	);
};
export default RoomName;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './RoomName.module.css';
const RoomName = ({ room }) => {
	const [ name, setName ] = useState(null);
	useEffect(() => {
		setName(Cookies.get('username'));
	});
	return (
		<div className={styles.p}>
			<Link to={`/chat?name=${name}&room=${room}`}>
				<span>{room}</span>
			</Link>
		</div>
	);
};
export default RoomName;

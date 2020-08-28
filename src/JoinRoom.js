import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import io from 'socket.io-client';
let socket;
const JoinRoom = () => {
	const [ roomName, setRoomName ] = useState(null);
	const [ password, setPassword ] = useState(null);
	const [ username, setUsername ] = useState(Cookies.get('username'));

	const ENDPOINT = 'http://localhost:3001';
	useEffect(
		() => {
			socket = io(ENDPOINT);
		},
		[ ENDPOINT ]
	);
	const onJoin = () => {
		Cookies.set('room', roomName, { expires: 1 });
		socket.emit('sendList', { username, roomName });
	};
	return (
		<div className="container" id="form">
			<div>
				<i className="fas fa-user" />
				<br />
				<input type="text" placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} required />
				<br />
			</div>
			<div>
				<i className="fas fa-envelope" />
				<br />
				<br />
				<br />
			</div>
			<button type="submit" onClick={onJoin}>
				Submit
			</button>
		</div>
	);
};
export default JoinRoom;

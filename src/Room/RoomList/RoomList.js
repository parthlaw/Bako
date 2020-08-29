import React, { useEffect, useState } from 'react';
import RoomName from './RoomName/RoomName';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
let socket;
const RoomList = () => {
	const [ rooms, setRooms ] = useState(null);
	const ENDPOINT = 'https://bako-crypto.herokuapp.com/';
	useEffect(
		() => {
			socket = io(ENDPOINT);
		},
		[ ENDPOINT ]
	);
	useEffect(() => {
		setRooms(Cookies.get('room'));
	}, []);
	if (!rooms) {
		return <h1>Loading</h1>;
	}
	return (
		<div>
			<RoomName room={rooms} />
		</div>
	);
};
export default RoomList;

import React, { useEffect, useState } from 'react';
import RoomName from './RoomName';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
let socket;
const RoomList = () => {
	const [ rooms, setRooms ] = useState([]);
	const ENDPOINT = 'http://localhost:3001';
	const ListUpdate = () => {
		fetch('http://localhost:3001/list', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: Cookies.get('username')
			})
		})
			.then((response) => {
				return response.json();
			})
			.then((list) => {
				setRooms((rooms) => [ ...rooms, list ]);
				console.log(list);
			});
	};
	useEffect(
		() => {
			socket = io(ENDPOINT);
		},
		[ ENDPOINT ]
	);
	useEffect(() => {
		ListUpdate();
	}, []);
	useEffect(() => {
		socket.on('sendList', (data) => {
			setRooms((rooms) => [ ...rooms, data.data ]);
		});
	}, []);
	const RoomArray = rooms.map((roomName, i) => {
		return <RoomName key={i} room={rooms[i].roomName} />;
	});
	return <div>{RoomArray}</div>;
};
export default RoomList;

import React, { useEffect, useState } from 'react';
import RoomName from './RoomName/RoomName';
import Cookies from 'js-cookie';
const RoomList = () => {
	const [ rooms, setRooms ] = useState(null);
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

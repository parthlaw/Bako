import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import RoomList from './RoomList';
const Dashboard = ({ pp }) => {
	const [ form, setForm ] = useState(false);
	const [ join, setJoin ] = useState(false);
	const onLogout = () => {
		Cookies.remove('username');
		Cookies.remove('route');
		Cookies.remove('room');
		Cookies.remove('token');
		Cookies.remove('chat');
		pp(false);
	};
	return (
		<div>
			{form ? <CreateRoom /> : null}
			{join ? <JoinRoom /> : null}
			<div
				className="dash-left"
				onClick={() => {
					setForm(false);
					setJoin(false);
				}}
			>
				<h4>Joined Rooms</h4>
				<RoomList />
			</div>
			<div className="dash-centre">
				<button onClick={() => setForm(true)}>Create Room</button>
				<button onClick={() => setJoin(true)}>Join Room</button>
				<button onClick={onLogout}>logout</button>
			</div>
		</div>
	);
};
export default Dashboard;

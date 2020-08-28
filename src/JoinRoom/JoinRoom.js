import React, { useState } from 'react';
import Cookies from 'js-cookie';
import styles from './JoinRoom.module.css';
const JoinRoom = ({ onCancel, Show }) => {
	const [ roomName, setRoomName ] = useState(null);
	const [ password, setPassword ] = useState(null);
	const onJoin = () => {
		fetch('http://localhost:3001/join', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + Cookies.get('token')
			},
			body: JSON.stringify({
				roomName: roomName,
				password: password
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data === 'entry successfull') {
					Cookies.set('chat', true, { expires: 1 });
					Cookies.set('room', roomName, { expires: 1 });
					Show();
				} else if (data === 'incorrect roomName') {
					console.log('incorrect roomName');
				} else {
					console.log('fail');
				}
			});
	};
	return (
		<div className={styles.container} id="form">
			<div>
				<div>
					<i className={styles.fasfa} />
					<br />
					<input type="text" placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} required />
					<br />
				</div>
				<div>
					<i className={styles.fasfa} />
					<br />
					<input
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<br />
				</div>
				<button type="submit" onClick={() => onCancel(false)}>
					Cancel
				</button>
				<button type="submit" onClick={onJoin}>
					Submit
				</button>
			</div>
		</div>
	);
};
export default JoinRoom;

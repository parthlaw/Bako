import React, { useState, useEffect, useRef } from 'react';
import styles from './CreateRoom.module.css';
import Cookies from 'js-cookie';
const CreateRoom = ({ onCancel }) => {
	const [ roomName, setRoomName ] = useState(null);
	const [ creater, setCreater ] = useState(null);
	const [ password, setPassword ] = useState(null);
	useEffect(() => {
		setCreater(Cookies.get('username'));
	}, []);
	const onSubmit = () => {
		fetch('http://localhost:3001/room', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + Cookies.get('token')
			},
			body: JSON.stringify({
				roomName: roomName,
				creater: creater,
				password: password
			})
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data === 'Fail') {
					alert('Failed to Create room please use different roomname');
				} else if (data === 'Success') {
					onCancel();
					alert('Room created. Join to continue');
				}
			});
	};
	return (
		<div className={styles.container} id="form">
			<div>
				<div>
					<i className={styles.fasfa} />
					<br />
					<input
						type="text"
						placeholder="Room Name(Should be unique)"
						onChange={(e) => setRoomName(e.target.value)}
						required
					/>
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
				<button type="submit" onClick={onCancel}>
					Cancel
				</button>

				<button type="submit" onClick={onSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};
export default CreateRoom;

import React from 'react';
import RoomList from './RoomList/RoomList';
import styles from './Room.module.css';
const Room = () => {
	return (
		<div className={styles.p} id="form">
			<div>
				<div>
					<RoomList />
				</div>
			</div>
		</div>
	);
};
export default Room;

import React from 'react';
import onlineIcon from '../Icons/onlineIcon.png';
import closeIcon from '../Icons/closeIcon.png';

import styles from './InfoBar.module.css';

const InfoBar = ({ room }) => (
	<div className={styles.infoBar}>
		<div className={styles.leftInnerContainer}>
			<img className={styles.onlineIcon} src={onlineIcon} alt="online icon" />
			<h3>{room}</h3>
		</div>
		<div className={styles.rightInnerContainer}>
			<a href="/">
				<img src={closeIcon} alt="close icon" />
			</a>
		</div>
	</div>
);

export default InfoBar;

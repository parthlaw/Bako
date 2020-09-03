import React from 'react';

import onlineIcon from '../Icons/onlineIcon.png';

import styles from './TextContainer.module.css';

const TextContainer = ({ users }) => (
	<div className={styles.textContainer}>
		<div>
			<h1>
				Realtime Private Chat Application{' '}
				<span role="img" aria-label="emoji">
					💬
				</span>
			</h1>
			<h2>
				Created with React, Redux, Express, Node and Socket.IO{' '}
				<span role="img" aria-label="emoji">
					❤️
				</span>
			</h2>
			<h2>
				Try it out right now!{' '}
				<span role="img" aria-label="emoji">
					⬅️
				</span>
			</h2>
		</div>
		{users ? (
			<div>
				<h1>People currently chatting:</h1>
				<div className={styles.activeContainer}>
					<h2>
						{users.map(({ name }) => (
							<div key={name} className={styles.activeItem}>
								{name}
								<img alt="Online Icon" src={onlineIcon} />
							</div>
						))}
					</h2>
				</div>
			</div>
		) : null}
	</div>
);

export default TextContainer;

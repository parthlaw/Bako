import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import { connect } from 'react-redux';

import styles from './Chat.module.css';

let socket;
const mapStateToProps = (state) => {
	return {
		detail: state.requestDetail.detail,
		isPending: state.requestDetail.isPending,
		err: state.requestDetail.err
	};
};

const Chat = ({ location, detail }) => {
	const [ name, setName ] = useState(Cookies.get('username'));
	const [ room, setRoom ] = useState(Cookies.get('room'));
	const [ users, setUsers ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ messages, setMessages ] = useState([]);
	const ENDPOINT = 'https://bako-crypto.herokuapp.com/';
	useEffect(
		() => {
			setRoom(Cookies.get('room'));
			setName(Cookies.get('username'));
		},
		[ detail ]
	);
	useEffect(
		() => {
			socket = io(ENDPOINT);

			socket.emit('join', { name, room }, (error) => {
				if (error) {
					alert(error);
				}
			});
		},
		[ ENDPOINT ]
	);

	useEffect(() => {
		socket.on('message', (message) => {
			setMessages((messages) => [ ...messages, message ]);
		});

		socket.on('roomData', ({ users }) => {
			setUsers(users);
		});
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};
	return (
		<div className={styles.outerContainer}>
			<div className={styles.container}>
				<InfoBar room={room} />
				<Messages messages={messages} name={name} />
				<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
			</div>
			<TextContainer users={users} />
		</div>
	);
};

export default connect(mapStateToProps, null)(Chat);

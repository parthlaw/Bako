import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';
import { connect } from 'react-redux';

import './Chat.css';

let socket;
const mapStateToProps = (state) => {
	return {
		detail: state.requestDetail.detail,
		isPending: state.requestDetail.isPending,
		err: state.requestDetail.err
	};
};

const Chat = ({ location, detail }) => {
	const [ name, setName ] = useState(detail.username);
	const [ room, setRoom ] = useState(Cookies.get('room'));
	const [ users, setUsers ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ messages, setMessages ] = useState([]);
	const [ auth, setAuth ] = useState(Cookies.get('chat'));
	const [ password, setPassword ] = useState(null);
	const [ username, setUsername ] = useState(null);
	const ENDPOINT = 'http://localhost:3001';
	const onJoin = () => {
		fetch('http://localhost:3001/join', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + Cookies.get('token')
			},
			body: JSON.stringify({
				roomName: room,
				password: password
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data === 'entry successfull') {
					console.log('entry successful');
					Cookies.set('chat', true, { expires: 1 });
					setAuth(true);
				} else if (data === 'incorrect roomName') {
					console.log('incorrect roomName');
				} else {
					console.log('fail');
				}
			});
	};
	useEffect(
		() => {
			socket = io(ENDPOINT);
			console.log(Cookies.get('room'), detail.username);
			setRoom(Cookies.get('room'));
			setName(detail.username);

			socket.emit('join', { name, room }, (error) => {
				if (error) {
					console.log(error);
				}
			});
		},
		[ ENDPOINT, detail ]
	);

	useEffect(
		() => {
			socket.on('message', (message) => {
				setMessages((messages) => [ ...messages, message ]);
				console.log(messages);
			});

			socket.on('roomData', ({ users }) => {
				setUsers(users);
			});
		},
		[ detail ]
	);

	const sendMessage = (event) => {
		event.preventDefault();

		if (message) {
			socket.emit('sendMessage', message, () => setMessage(''));
		}
	};
	if (auth) {
		return (
			<div className="outerContainer">
				<div className="container">
					<InfoBar room={room} />
					<Messages messages={messages} name={name} />
					<Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
				</div>
				<TextContainer users={users} />
			</div>
		);
	} else {
		return (
			<div>
				<input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
				<button type="submit" onClick={onJoin}>
					Submit
				</button>
			</div>
		);
	}
};

export default connect(mapStateToProps, null)(Chat);

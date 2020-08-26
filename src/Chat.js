import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import TextContainer from './TextContainer';
import Messages from './Messages';
import InfoBar from './InfoBar';
import Input from './Input';

import './Chat.css';
import { Redirect } from 'react-router-dom';

let socket;

const Chat = ({ location }) => {
	const [ name, setName ] = useState('');
	const [ room, setRoom ] = useState('');
	const [ users, setUsers ] = useState('');
	const [ message, setMessage ] = useState('');
	const [ messages, setMessages ] = useState([]);
	const [ auth, setAuth ] = useState(Cookies.get('chat'));
	const [ allow, setAllow ] = useState(false);
	const [ password, setPassword ] = useState(null);
	const [ username, setUsername ] = useState(null);
	const ENDPOINT = 'http://localhost:3001';
	const Check = () => {
		fetch('http://localhost:3001/chatCheck', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + Cookies.get('token')
			}
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				if (data === 'Authorized') {
					setAuth(true);
				}
			});
	};
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
			const { name, room } = queryString.parse(location.search);

			socket = io(ENDPOINT);

			setRoom(room);
			setName(name);

			socket.emit('join', { name, room }, (error) => {
				if (error) {
					alert(error);
				}
			});
		},
		[ ENDPOINT, location.search ]
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

export default Chat;

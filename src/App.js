import React, { useState, useEffect } from 'react';
import Login from './Login';
import Chat from './Chat';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard';
import Cookies from 'js-cookie';
const App = () => {
	const [ route, setRoute ] = useState(false);
	const [ chang, setChang ] = useState(null);
	const [ auth, setAuth ] = useState(false);
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
	useEffect(
		() => {
			Check();
			console.log(auth);
		},
		[ Cookies.get('room'), Cookies.get('username') ]
	);
	const path = (x) => {
		setRoute(x);
	};
	const change = () => {
		setChang(1);
	};
	if (Cookies.get('route')) {
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<Dashboard pp={path} />
					</Route>
					<Route path="/chat" component={Chat} />
				</Switch>
			</Router>
		);
	} else {
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<Login path={path} />
					</Route>
				</Switch>
			</Router>
		);
	}
};

export default App;

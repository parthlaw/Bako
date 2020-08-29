import React, { useState, useEffect } from 'react';
import Login from './Login/Login';
import Chat from './Chat/Chat';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { requestDetail } from './Redux/actions';
const mapStateToProps = (state) => {
	return {
		detail: state.requestDetail.detail,
		isPending: state.requestDetail.isPending,
		err: state.requestDetail.err
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onRequestDetail: (data) => dispatch(requestDetail(data))
	};
};
const App = ({ onRequestDetail }) => {
	const [ route, setRoute ] = useState(false);
	const [ auth, setAuth ] = useState(Cookies.get('ok'));
	const Check = () => {
		if (Cookies.get('token')) {
			fetch('https://bako-crypto.herokuapp.com/chatCheck', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + Cookies.get('token')
				}
			})
				.then((response) => response.json())
				.then((data) => {
					if (data === 'Authorized') {
						setAuth(true);
						Cookies.set('ok', true, { expires: 1 });
						onRequestDetail(Cookies.get('username'));
					}
				});
		} else return <Redirect to="/" />;
	};
	useEffect(
		() => {
			Check();
		},
		[ Cookies.get('room'), Cookies.get('username') ]
	);
	const path = (x) => {
		setRoute(x);
	};
	if (Cookies.get('route')) {
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<Dashboard pp={path} />
					</Route>
					<Route path="/chat">{!auth ? <Redirect to="/" /> : <Chat />}</Route>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);

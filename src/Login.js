import React, { useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { requestDetail } from './actions';
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
const Login = ({ path, onRequestDetail, detail }) => {
	const [ email, setEmail ] = useState(null);
	const [ logUname, setLogUname ] = useState(null);
	const [ regUname, setRegUname ] = useState(null);
	const [ logPass, setLogPass ] = useState(null);
	const [ regPass, setRegpass ] = useState(null);
	const [ temp, setTemp ] = useState(false);
	const log = useRef(null);
	const onReg = () => {
		fetch('http://localhost:3001/register', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: email,
				username: regUname,
				password: regPass
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data === 'success') {
					log.current.focus();
					alert('Login to continue');
				}
			});
	};
	const onLogin = () => {
		fetch('http://localhost:3001/login', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: logUname,
				password: logPass
			})
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.message === 'Authentication successful!') {
					onRequestDetail(logUname);
					console.log('login successful');
					setTemp(true);
					Cookies.set('token', data.token, { expires: 1 });
					Cookies.set('username', logUname, { expires: 1 });
					Cookies.set('route', true);
					path(true);
				} else if (data === 'incorrect username') {
					console.log('incorrect username');
				} else {
					console.log('fail');
				}
			});
	};
	return (
		<div>
			<div className="log-container">
				<h1>Signup</h1>
				<input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
				<input type="text" placeholder="username" onChange={(e) => setRegUname(e.target.value)} />
				<input type="password" placeholder="password" onChange={(e) => setRegpass(e.target.value)} />

				<input
					type="submit"
					placeholder="submit"
					onClick={(e) => (!email || !regUname || !regPass ? e.preventDefault() : onReg(e))}
				/>
			</div>
			<div className="log-container">
				<h1>Login</h1>
				<input type="text" placeholder="username" onChange={(e) => setLogUname(e.target.value)} ref={log} />
				<input type="password" placeholder="password" onChange={(e) => setLogPass(e.target.value)} />
				<input
					type="submit"
					placeholder="submit"
					onClick={(e) => (!logUname || !logPass ? e.preventDefault() : onLogin(e))}
				/>
			</div>
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

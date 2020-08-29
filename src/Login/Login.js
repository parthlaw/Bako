import React, { useState, useRef } from 'react';
import Cookies, { set } from 'js-cookie';
import { connect } from 'react-redux';
import { requestDetail } from '../Redux/actions';
import styles from './Login.module.css';
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
	const [ reg, setReg ] = useState(true);
	const [ login, setLogin ] = useState(false);
	const log = useRef(null);
	const onReg = () => {
		fetch('https://bako-crypto.herokuapp.com/register', {
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
					setReg(false);
					setLogin(true);
					log.current.focus();
					alert('Login to continue');
				}
			});
	};
	const onLogin = () => {
		fetch('https://bako-crypto.herokuapp.com/login', {
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
					alert('Login Successful');
					setTemp(true);
					Cookies.set('token', data.token, { expires: 1 });
					Cookies.set('username', logUname, { expires: 1 });
					Cookies.set('route', true);
					path(true);
				} else if (data === 'incorrect username') {
					alert('Incorrect Username');
				} else {
					alert('Incorrect Password');
				}
			});
	};
	if (reg) {
		return (
			<div className={styles.Main}>
				<div className={styles.select}>
					<button
						onClick={() => {
							setLogin(false);
							setReg(true);
						}}
					>
						Signup
					</button>
					<button
						onClick={() => {
							setReg(false);
							setLogin(true);
						}}
					>
						Login
					</button>
				</div>
				<div className={styles.Outer}>
					<div className={styles.regContainer}>
						<h1 className={styles.heading}>Signup</h1>
						<input
							className={styles.joinInput}
							type="text"
							placeholder="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							className={styles.joinInput}
							type="text"
							placeholder="username"
							onChange={(e) => setRegUname(e.target.value)}
						/>
						<input
							className={styles.joinInput}
							type="password"
							placeholder="password"
							onChange={(e) => setRegpass(e.target.value)}
						/>

						<input
							className={styles.button}
							type="submit"
							placeholder="submit"
							onClick={(e) => (!email || !regUname || !regPass ? e.preventDefault() : onReg(e))}
						/>
					</div>
				</div>
			</div>
		);
	} else if (login) {
		return (
			<div className={styles.Main}>
				<div className={styles.select}>
					<button
						onClick={() => {
							setLogin(false);
							setReg(true);
						}}
					>
						Signup
					</button>
					<button
						onClick={() => {
							setReg(false);
							setLogin(true);
						}}
					>
						Login
					</button>
				</div>
				<div className={styles.Outer}>
					<div className={styles.logContainer}>
						<h1 className={styles.heading}>Login</h1>
						<input
							className={styles.joinInput}
							type="text"
							placeholder="username"
							onChange={(e) => setLogUname(e.target.value)}
							ref={log}
						/>
						<input
							className={styles.joinInput}
							type="password"
							placeholder="password"
							onChange={(e) => setLogPass(e.target.value)}
						/>
						<input
							className={styles.button}
							type="submit"
							placeholder="submit"
							onClick={(e) => (!logUname || !logPass ? e.preventDefault() : onLogin(e))}
						/>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles.Main}>
				<div className={styles.select}>
					<button
						onClick={() => {
							setLogin(false);
							setReg(true);
						}}
					>
						Signup
					</button>
					<button
						onClick={() => {
							setReg(false);
							setLogin(true);
						}}
					>
						Login
					</button>
				</div>
			</div>
		);
	}
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);

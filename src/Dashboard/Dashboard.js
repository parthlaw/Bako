import React, { useState } from 'react';
import Cookies from 'js-cookie';
import CreateRoom from '../CreateRoom/CreateRoom';
import JoinRoom from '../JoinRoom/JoinRoom';
import { connect } from 'react-redux';
import { deleteUser } from '../Redux/actions';
import styles from './Dashboard.module.css';
import Room from '../Room/Room';
import Logo from '../Logo.png';
const mapStateToProps = (state) => {
	return {
		detail: state.requestDetail.detail,
		isPending: state.requestDetail.isPending,
		err: state.requestDetail.err
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		deleteUser: (detail) => dispatch(deleteUser(detail))
	};
};
const Dashboard = ({ pp, detail, deleteUser, isPending }) => {
	const [ form, setForm ] = useState(false);
	const [ join, setJoin ] = useState(false);
	const [ roomSel, setRoomsel ] = useState(0);
	const onLogout = () => {
		Cookies.remove('username');
		Cookies.remove('route');
		Cookies.remove('room');
		Cookies.remove('token');
		Cookies.remove('chat');
		Cookies.remove('ok');
		Cookies.remove('io');
		deleteUser(detail);
		fetch('https://bako-crypto.herokuapp.com/logout');
		pp(false);
	};
	const ShowRoom = () => {
		setRoomsel(true);
		setJoin(false);
		setForm(false);
	};
	const Cancel = () => {
		setForm(false);
	};
	const CancelJoin = () => {
		setJoin(false);
	};
	if (isPending) {
		return (
			<div className={styles.Outer}>
				<div className={styles.Inner}>
					<img src={Logo} alt="loading icon" />
					<h1 className={styles.heading}>LOADING</h1>
				</div>
			</div>
		);
	}
	return (
		<div className={styles.Outer}>
			<div className={styles.Inner}>
				{form ? <CreateRoom onCancel={Cancel} /> : null}
				{join ? <JoinRoom onCancel={CancelJoin} Show={ShowRoom} /> : null}
				{roomSel ? <Room /> : null}
				<div className={styles.dashLeft}>
					<h4 className={styles.heading}>Welcome to BAKO {detail.username}</h4>
				</div>
				<div className={styles.dashCentre}>
					<button
						className={styles.button}
						onClick={() => {
							setForm(true);
							setJoin(false);
						}}
					>
						Create Room
					</button>
					<button
						className={styles.button}
						onClick={() => {
							setJoin(true);
							setForm(false);
						}}
					>
						Join Room
					</button>
					<button className={styles.button} onClick={onLogout}>
						logout
					</button>
				</div>
			</div>
		</div>
	);
};
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

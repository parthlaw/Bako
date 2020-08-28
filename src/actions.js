import { REQUEST_USER_PENDING, REQUEST_USER_SUCCESS, REQUEST_USER_FAILED, DELETE_USER } from './constants.js';
export const requestDetail = (data) => (dispatch) => {
	dispatch({ type: REQUEST_USER_PENDING });
	fetch('http://localhost:3001/dash', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			username: data
		})
	})
		.then((response) => response.json())
		.then((data) => dispatch({ type: REQUEST_USER_SUCCESS, payload: data }))
		.catch((err) => dispatch({ type: REQUEST_USER_FAILED, payload: err }));
};
export const deleteUser = (detail) => ({
	type: DELETE_USER,
	payload: detail
});

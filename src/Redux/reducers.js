import { REQUEST_USER_PENDING, REQUEST_USER_SUCCESS, REQUEST_USER_FAILED, DELETE_USER } from './constants.js';

const initialState = {
	isPending: false,
	detail: [],
	err: ''
};
export const requestDetail = (state = initialState, action = {}) => {
	switch (action.type) {
		case REQUEST_USER_PENDING:
			return Object.assign({}, state, { isPending: true });
		case REQUEST_USER_SUCCESS:
			return Object.assign({}, state, { detail: action.payload, isPending: false });
		case REQUEST_USER_FAILED:
			return Object.assign({}, state, { err: action.payload, isPending: false });
		case DELETE_USER:
			return { state: initialState };
		default:
			return state;
	}
};

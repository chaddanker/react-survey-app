import axios from 'axios';
import { FETCH_USER } from './types';


//if theres only one expression to be returned in arrow function then can remove outside curly braces as well as return statement
export const fetchUser = () => async dispatch => {
	const res = await axios.get('/api/current_user');

	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async dispatch => {
	const res = await axios.post('/api/stripe', token);

	dispatch({ type: FETCH_USER, payload: res.data }); 
};
//highly modified syntax above

// export const fetchUser = () => {
// 	return (dispatch) => {
// 		axios
// 		.get('/api/current_user')
// 		.then(res => dispatch({ type: FETCH_USER, payload: res }));
// 	};
// };

// export const fetchUser = () => async dispatch => {
// 	const res = await axios.get('/api/current_user')

// 	dispatch({ type: FETCH_USER, payload: res });
// };
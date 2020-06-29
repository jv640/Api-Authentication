import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_ERROR } from './types';
// ActionCreators -> create/return Actions {{}} -> dispatched -> middleware -> reducers

export const signUp = data => {
    return async dispatch => {
        try{
        // step 1 : Use the Data to make http request to BE and send it along 
        // step 2 : Take BE's repsonse (jwtToken is here now)
            const res = await axios.post('http://localhost:5000/users/signup', data)
            console.log('res', res);

        // step 3 : Dispatch user just signed up (with jwtToken)
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token 
            });

        // step 4 : save the jwtToken in our local storage
            localStorage.setItem('JWT_TOKEN', res.data.token);
        } catch(err) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            });
        }

    }
}
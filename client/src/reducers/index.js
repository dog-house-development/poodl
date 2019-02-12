import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    admins: adminsReducer,
    errors: errorReducer
});

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import membersReducer from './membersReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    admins: adminsReducer,
    members: membersReducer,
    errors: errorReducer
});

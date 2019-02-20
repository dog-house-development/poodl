import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import volunteersReducer from './volunteersReducer';
import membersReducer from './membersReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    admins: adminsReducer,
    volunteers: volunteersReducer,
    members: membersReducer,
    errors: errorReducer
});

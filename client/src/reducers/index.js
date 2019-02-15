import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import volunteersReducer from './volunteersReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    auth: authReducer,
    admins: adminsReducer,
    volunteers: volunteersReducer,
    errors: errorReducer
});

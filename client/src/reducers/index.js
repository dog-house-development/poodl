import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import volunteersReducer from './volunteersReducer';
import membersReducer from './membersReducer';
import activitiesReducer from './activitiesReducer';

export default combineReducers({
    auth: authReducer,
    admins: adminsReducer,
    volunteers: volunteersReducer,
    members: membersReducer,
    activities: activitiesReducer
});

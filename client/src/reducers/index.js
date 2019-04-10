import { combineReducers } from 'redux';
import authReducer from './authReducer';
import adminsReducer from './adminsReducer';
import volunteersReducer from './volunteersReducer';
import membersReducer from './membersReducer';
import activitiesReducer from './activitiesReducer';
import servicesReducer from './servicesReducer';

export default combineReducers({
    auth: authReducer,
    admins: adminsReducer,
    volunteers: volunteersReducer,
    members: membersReducer,
    activities: activitiesReducer,
    services: servicesReducer
});

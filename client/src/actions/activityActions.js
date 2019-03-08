import axios from 'axios';

import { GET_ERRORS } from './types';

// Add Activity
export const addActivity = (activityData, history) => dispatch => {
    axios
        .post('/api/activities/add', activityData)
        .then(res => history.push('/dashboard')) // go to new activity's page when created
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

import axios from 'axios';

import { GET_ERRORS } from './types';

// Add Activity
export const addActivity = (activityData, history) => dispatch => {
    axios
        .post('/api/activities/add', activityData)
        // change to go to new activity page instead
        .then(res => history.push('/dashboard'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

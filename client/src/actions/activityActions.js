import axios from 'axios';

import { GET_ERRORS, FILTER_ACTIVITIES_BEGIN, FILTER_ACTIVITIES_SUCCESS } from './types';

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

// Filter activities
export const filterActivities = activityData => dispatch => {
    dispatch(filterActivitiesBegin());
    axios
        .post('/api/activities/filter', activityData)
        .then(res => {
            dispatch(filterActivitiesSuccess(res.data));
            return res.data;
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const filterActivitiesBegin = () => ({
    type: FILTER_ACTIVITIES_BEGIN
});

export const filterActivitiesSuccess = activities => ({
    type: FILTER_ACTIVITIES_SUCCESS,
    payload: activities
});

import axios from 'axios';

import { GET_ERRORS, FILTER_ACTIVITIES_BEGIN, FILTER_ACTIVITIES_SUCCESS } from './types';

// Add Activity
export const addActivity = (activityData, history) => dispatch => {
    axios
        .post('/api/activities/', activityData)
        // change to go to view single activity page instead
        .then(res => history.push('/activities'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Filter activities
export const filterActivities = (activityFilter = {}) => dispatch => {
    dispatch(filterActivitiesBegin());
    axios
        .post('/api/activities/filter', activityFilter)
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

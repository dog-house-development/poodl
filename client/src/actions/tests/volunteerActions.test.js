import * as actions from '../volunteerActions';
import * as types from '../types';

describe('volunteer actions', () => {
    it('should create an action to begin fetching volunteers', () => {
        const expectedAction = {
            type: types.FETCH_VOLUNTEERS_BEGIN
        };
        expect(actions.fetchVolunteersBegin()).toEqual(expectedAction);
    });

    it('should create an action when successfully fetched volunteers', () => {
        const volunteers = {
            all: [],
            loading: false
        };
        const expectedAction = {
            type: types.FETCH_VOLUNTEERS_SUCCESS,
            payload: volunteers
        };
        expect(actions.fetchVolunteersSuccess(volunteers)).toEqual(expectedAction);
    });

    it('should create an action to begin fetching specific volunteer', () => {
        const expectedAction = {
            type: types.FETCH_VOLUNTEER_BEGIN
        };
        expect(actions.fetchVolunteerBegin()).toEqual(expectedAction);
    });

    it('should create an action when successfully fetched specific volunteer', () => {
        const volunteer = {
            one: {},
            loading: false
        };
        const expectedAction = {
            type: types.FETCH_VOLUNTEER_SUCCESS,
            payload: volunteer
        };
        expect(actions.fetchVolunteerSuccess(volunteer)).toEqual(expectedAction);
    });
});

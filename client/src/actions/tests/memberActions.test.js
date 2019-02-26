import * as actions from '../memberActions';
import * as types from '../types';

describe('member actions', () => {
    it('should create an action to begin fetching members', () => {
        const expectedAction = {
            type: types.FETCH_MEMBERS_BEGIN
        };
        expect(actions.fetchMembersBegin()).toEqual(expectedAction);
    });

    it('should create an action when successfully fetched members', () => {
        const members = {
            all: [],
            loading: false
        };
        const expectedAction = {
            type: types.FETCH_MEMBERS_SUCCESS,
            payload: members
        };
        expect(actions.fetchMembersSuccess(members)).toEqual(expectedAction);
    });

    it('should create an action to begin fetching specific member', () => {
        const expectedAction = {
            type: types.FETCH_MEMBER_BEGIN
        };
        expect(actions.fetchMemberBegin()).toEqual(expectedAction);
    });

    it('should create an action when successfully fetched specific member', () => {
        const member = {
            one: {},
            loading: false
        };
        const expectedAction = {
            type: types.FETCH_MEMBER_SUCCESS,
            payload: member
        };
        expect(actions.fetchMemberSuccess(member)).toEqual(expectedAction);
    });
});

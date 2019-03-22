import ActionHelper from './utils/ActionHelper';
import Types from './types';

export default {
    create: (data, history) => dispatch => {
        data.accessLevel = 'Volunteer';
        ActionHelper.create(dispatch, Types.volunteer, data, history);
    },

    filter: data => dispatch => {
        data = { ...data, accessLevel: 'Volunteer' };
        ActionHelper.filter(dispatch, Types.volunteer, data);
    },

    get: id => dispatch => {
        ActionHelper.get(dispatch, Types.volunteer, id);
    },

    edit: (id, data) => dispatch => {
        ActionHelper.edit(dispatch, Types.volunteer, id, data);
    }
};

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

    get: (id, onFail) => dispatch => {
        ActionHelper.get(dispatch, Types.volunteer, id, onFail);
    },

    edit: (id, data, onSuccess) => dispatch => {
        ActionHelper.edit(dispatch, Types.volunteer, id, data, onSuccess);
    },

    delete: (id, onSuccess) => dispatch => {
        ActionHelper.delete(dispatch, Types.volunteer, id, onSuccess);
    }
};

import ActionHelper from './utils/ActionHelper';
import Types from './types';

export default {
    create: (data, history) => dispatch => {
        ActionHelper.create(dispatch, Types.admin, data, history);
    },

    filter: data => dispatch => {
        data = { ...data, accessLevel: { $ne: 'Volunteer' } };
        ActionHelper.filter(dispatch, Types.admin, data);
    },

    get: (id, onFail) => dispatch => {
        ActionHelper.get(dispatch, Types.admin, id, onFail);
    },

    edit: (id, data, onSuccess) => dispatch => {
        ActionHelper.edit(dispatch, Types.admin, id, data, onSuccess);
    },

    delete: (id, onSuccess) => dispatch => {
        ActionHelper.delete(dispatch, Types.admin, id, onSuccess);
    }
};

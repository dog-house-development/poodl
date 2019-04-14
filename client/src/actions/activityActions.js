import ActionHelper from './utils/ActionHelper';
import Types from './types';

export default {
    create: (data, history) => dispatch => {
        ActionHelper.create(dispatch, Types.activity, data, history);
    },

    filter: data => dispatch => {
        ActionHelper.filter(dispatch, Types.activity, data);
    },

    get: (id, onFail) => dispatch => {
        ActionHelper.get(dispatch, Types.activity, id, onFail);
    },

    edit: (id, data, onSuccess) => dispatch => {
        ActionHelper.edit(dispatch, Types.activity, id, data, onSuccess);
    },

    delete: (id, onSuccess) => dispatch => {
        ActionHelper.delete(dispatch, Types.activity, id, onSuccess);
    }
};

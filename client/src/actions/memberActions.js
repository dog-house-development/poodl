import ActionHelper from './utils/ActionHelper';
import Types from './types';

export default {
    create: (data, history, onSuccess) => dispatch => {
        ActionHelper.create(dispatch, Types.member, data, history, onSuccess);
    },

    filter: data => dispatch => {
        ActionHelper.filter(dispatch, Types.member, data);
    },

    get: (id, onFail) => dispatch => {
        ActionHelper.get(dispatch, Types.member, id, onFail);
    },

    edit: (id, data, onSuccess) => dispatch => {
        ActionHelper.edit(dispatch, Types.member, id, data, onSuccess);
    },

    delete: (id, onSuccess) => dispatch => {
        ActionHelper.delete(dispatch, Types.member, id, onSuccess);
    }
};

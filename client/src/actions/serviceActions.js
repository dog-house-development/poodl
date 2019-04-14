import ActionHelper from './utils/ActionHelper';
import Types from './types';

export default {
    create: (data, history, onSuccess) => dispatch => {
        ActionHelper.create(dispatch, Types.service, data, history, onSuccess);
    },

    filter: data => dispatch => {
        ActionHelper.filter(dispatch, Types.service, data);
    },

    get: (id, onFail) => dispatch => {
        ActionHelper.get(dispatch, Types.service, id, onFail);
    },

    edit: (id, data, onSuccess) => dispatch => {
        ActionHelper.edit(dispatch, Types.service, id, data, onSuccess);
    },

    delete: (id, onSuccess) => dispatch => {
        ActionHelper.delete(dispatch, Types.service, id, onSuccess);
    }
};

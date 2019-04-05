import ActionHelper from './utils/ActionHelper';
import Types from './types';

export default {
    create: (data, history) => dispatch => {
        ActionHelper.create(dispatch, Types.member, data, history);
    },

    filter: data => dispatch => {
        ActionHelper.filter(dispatch, Types.member, data);
    },

    get: id => dispatch => {
        ActionHelper.get(dispatch, Types.member, id);
    },

    edit: (id, data, onSuccess) => dispatch => {
        ActionHelper.edit(dispatch, Types.member, id, data, onSuccess);
    }
};

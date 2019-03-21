import ActionHelper from './utils/ActionHelper';
import Types from './types';

export default {
    create: data => dispatch => {
        ActionHelper.create(dispatch, Types.member, data);
    },

    filter: data => dispatch => {
        ActionHelper.filter(dispatch, Types.member, data);
    },

    get: id => dispatch => {
        ActionHelper.get(dispatch, Types.member, id);
    },

    edit: (id, data) => dispatch => {
        ActionHelper.edit(dispatch, Types.member, id, data);
    }
};

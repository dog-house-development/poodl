import { getDefaultActions, ActionHelper } from './utils/ActionHelper';
import Types from './types';

export default {
    ...getDefaultActions(Types.volunteer),
    create: (data, history, onSuccess, onFail) => dispatch => {
        data.accessLevel = 'Volunteer';
        return ActionHelper.create(dispatch, Types.volunteer, data, history, onSuccess, onFail);
    },

    filter: (data, onSuccess, onFail) => dispatch => {
        data = { ...data, accessLevel: 'Volunteer' };
        return ActionHelper.filter(dispatch, Types.volunteer, data, onSuccess, onFail);
    }
};

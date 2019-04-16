import { getDefaultActions, ActionHelper } from './utils/ActionHelper';
import Types from './types';

export default {
    create: (data, history) => dispatch => {
        data.accessLevel = 'Volunteer';
        return ActionHelper.create(dispatch, Types.volunteer, data, history);
    },

    filter: data => dispatch => {
        data = { ...data, accessLevel: 'Volunteer' };
        return ActionHelper.filter(dispatch, Types.volunteer, data);
    },

    ...getDefaultActions(Types.volunteer)
};

import { getDefaultActions, ActionHelper } from './utils/ActionHelper';

import Types from './types';

export default {
    filter: data => dispatch => {
        data = { ...data, accessLevel: { $ne: 'Volunteer' } };
        return ActionHelper.filter(dispatch, Types.admin, data);
    },

    ...getDefaultActions(Types.admin)
};

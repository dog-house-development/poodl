import { getDefaultActions, ActionHelper } from './utils/ActionHelper';

import Types from './types';

export default {
    filter: (data, onSuccess, onFail) => dispatch => {
        data = { ...data, accessLevel: { $ne: 'Volunteer' } };
        return ActionHelper.filter(dispatch, Types.admin, data, onSuccess, onFail);
    },

    ...getDefaultActions(Types.admin)
};

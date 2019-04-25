import { getDefaultActions } from './utils/ActionHelper';
import Types from './types';

export default {
    ...getDefaultActions(Types.member)
};

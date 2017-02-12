import { USER_UPDATE } from '../constants/actions';

export const userAction = user => ({
    type    : USER_UPDATE,
    payload : user
});

export default (state = {}, action ) => {
    switch (action.type) {
        case USER_UPDATE:
            return {
                ...state,
                user: action.payload
            }
        default:
            return state;
    }
}
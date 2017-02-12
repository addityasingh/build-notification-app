import { USER_UPDATE, GITHUB_TOKEN_UPDATE } from '../constants/actions';

export default (state = {}, action ) => {
    switch (action.type) {
        case USER_UPDATE:
            return {
                ...state,
                userDetails: action.payload
            }
        case GITHUB_TOKEN_UPDATE: 
            return {
                ...state,
                token: action.payload
            }
        default:
            return state;
    }
}
import { USER_UPDATE, GITHUB_TOKEN_UPDATE } from '../constants/actions';

export const updateUser = user => ({
    type    : USER_UPDATE,
    payload : user
});

export const updateToken = token => ({
    type: GITHUB_TOKEN_UPDATE,
    payload: token
})

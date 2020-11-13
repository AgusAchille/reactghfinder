import {
    SEARCH_USERS,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING
} from '../types';

export default function GithubReducer(state, action) {
    switch(action.type) {
        case SEARCH_USERS:
            return {
                ...state,
                usersList: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}
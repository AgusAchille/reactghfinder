import {
    SEARCH_USERS,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING,
    SET_USER_LOADING
} from '../types';

export default function GithubReducer(state, action) {
    switch(action.type) {
        case CLEAR_USERS:
            return {
                ...state, 
                usersList: [],
                loading: false
            }
        case GET_REPOS:
                return {
                    ...state,
                    repos: action.payload
                }
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                userLoading: false
            }
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
        case SET_USER_LOADING:
            return {
                ...state,
                userLoading: true
            }
                
        default:
            return state;
    }
}
import React, { useReducer } from 'react';
import Axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING
} from '../types';

export default function GithubState(props) {
    const initialState = {
        usersList: [],
        user: {},
        repos: [],
        alert: null,
        loading: false,
        userLoading: false,
        reposLoading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState)

    // Search Users
    async function searchText(text) {
        if(text){
            setLoading();
            const response = await Axios.get(`https://api.github.com/search/users?q=${text}`, githubConfig);
            
            dispatch({
                type: SEARCH_USERS,
                payload: response.data.items
            })
            
            console.log(response);
        }
    }
    // Get Repos

    // Get Repos

    // Clear Users

    // Set Loading
    function setLoading() {
        dispatch({ type: SET_LOADING });
    }

    return <GithubContext.Provider
        value = {{
            usersList: state.usersList,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            searchText}}
            >
        {props.children}
    </GithubContext.Provider>
}

const githubConfig = {
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
}
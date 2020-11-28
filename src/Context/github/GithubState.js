import React, { useReducer } from 'react';
import Axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    SET_LOADING,
    SET_USER_LOADING
} from '../types';


let githubConfig;

if(process.env.NODE_ENV !== 'production') {
    githubConfig = {
        headers: {
          Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
        }
    };
}
else {
    githubConfig = {
        headers: {
          Authorization: `token 716a938b73c10250cfd1eb2e1ddd508519b80a26`
        }
    };
};

const reposPerPage = 5

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
        const hola = process.env.lalalalala;
        console.log(githubConfig);
        console.log(hola)
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
    // Get User
    async function getUser (login) {
        if(login){
            setUserLoading();
            const response = await Axios.get(`https://api.github.com/users/${login}`, githubConfig);
            
            dispatch({ type: GET_USER, payload: response.data })
            console.log(response);
        }
    }

    // Get Repos
    async function getRepos(login){
        if(login){
            //setReposLoading(true);
            const response = await Axios.get(`https://api.github.com/users/${login}/repos?per_page=${reposPerPage}&sort=created:asc`, githubConfig);
            dispatch({ type: GET_REPOS, payload: response.data});
            //setReposLoading(false);
            console.log(response);
        }
    }

    // Clear Users
    function clearUsers(e){
        e.preventDefault();
        dispatch({ type: CLEAR_USERS });
    }

    // Set Loading
    function setLoading() {
        dispatch({ type: SET_LOADING });
    }

    //Set User Login
    function setUserLoading() {
        dispatch({ type: SET_USER_LOADING })
    }

    return <GithubContext.Provider
        value = {{
            usersList: state.usersList,
            user: state.user,
            repos: state.repos,
            loading: state.loading,
            userLoading: state.userLoading,
            searchText,
            clearUsers,
            getUser,
            getRepos}}
            >
        {props.children}
    </GithubContext.Provider>
}
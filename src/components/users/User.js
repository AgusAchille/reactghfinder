import React, { Fragment, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'
import Repos from '../repos/Repos'
import GithubContext from '../../Context/github/githubContext'

export default function User ({ repos, getRepos, match }) {
    const githubContext = useContext(GithubContext);
    
    useEffect(() => {
        const login = match.params.login;
        if(login !== githubContext.user.login)
            githubContext.getUser(login);
            githubContext.getRepos(login);
        // eslint-disable-next-line
    }, []);
    

    if (githubContext.userLoading) return <Spinner />
    
    const { name, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable, company } = githubContext.user;
    
    return (
        <Fragment>
            <Link to='/' className="btn btn-light" style={{ border: '1px solid #ddd'}}>Back to Search</Link>
            <div className="card grid-2">
                <div className="all-center">
                    <img src={avatar_url} className="round-img" alt="" style={{width: '10rem'}} />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                    <span> Hireable: { hireable ? checkIcon : crossIcon }</span>
                </div>
                <div>
                    {bio &&
                    <Fragment>
                        <h3>Bio</h3>
                        <p>{bio}</p>
                    </Fragment>}
                    <a href={html_url} className="btn btn-dark my-1" target="_blank" rel="noreferrer">
                        Visit Github Profile
                    </a>
                    <ul>
                        <li>
                            <strong>Username: </strong> {login}
                        </li>
                        {company &&
                        <li>
                            <strong>Company: </strong>{company}
                        </li>}
                        {blog &&
                        <li>
                            <strong>Website: </strong> {blog}
                        </li>}
                    </ul>
                </div>
            </div>
            <div className="card text-center">
                <div className="badge badge-primary">Followers: {followers}</div>
                <div className="badge badge-success">Following: {following}</div>
                <div className="badge badge-light">Public repos: {public_repos}</div>
                <div className="badge badge-dark">Public gists: {public_gists}</div>
            </div>
            <Repos repos={githubContext.repos} />
        </Fragment>
    )
}        

const checkIcon = <i className="fas fa-check text-success" />;
const crossIcon = <i className="fas fa-times-circle text-danger" />;
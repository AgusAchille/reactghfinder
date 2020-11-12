import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import PropTypes from 'prop-types'

export default class User extends Component {
    async componentDidMount(){
        const login = this.props.match.params.login;
        this.props.getUser(login);
    }
    
    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired
    }

    render() {
        if (this.props.loading) return <Spinner />
        
        const { name, avatar_url, location, bio, blog, login, html_url, followers, following, public_repos, public_gists, hireable, company } = this.props.user;
        
        return (
            <Fragment>
                Hireable: { hireable ? checkIcon : crossIcon }

                <div className="card grid-2">
                    <div className="all-center">
                        <img src={avatar_url} className="round-img" alt="" style={{width: '10rem'}} />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
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
                <Link to='/' className="btn btn-light">Back to Search</Link>
            </Fragment>
            )
    }        
}

const checkIcon = <i className="fas fa-check text-success" />;
const crossIcon = <i className="fas fa-times-circle text-danger" />;
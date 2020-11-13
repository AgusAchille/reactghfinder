import React, {Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User'
import Axios from 'axios';
import Search from './components/users/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'
import GithubState from './Context/github/GithubState'

export default function App() {
    const [usersList, setUsersList] = useState([]) ;
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [alert, setAlert] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userLoading, setUserLoading] = useState(false);
    const [reposLoading, setReposLoading] = useState(false);

    // async componentDidMount(){
    //     this.setState({loading: true});
    //     const response = await Axios.get('https://api.github.com/users', githubConfig);
    //     this.setState({usersList: response.data, loading: false});
        
    //     console.log(response);
    // }
    
    return (
        <GithubState>
            <Router>
                <div className="App">
                    <Navbar title="Github Finder" icon="fab fa-github"/>
                    <div className="container">
                        <Alert alert={alert}/>
                        <Switch>
                            <Route exact path='/' render={props =>(
                                <Fragment>
                                    <Search
                                        clearBtn={ clearBtn }
                                        showClearBtn={ usersList.length > 0 }
                                        setAlert={ setAlertMessage }
                                        />
                                    <Users users={ usersList } loading={ loading } />
                                </Fragment>
                            )} 
                            />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/user/:login' render={props => (
                                <User
                                    { ... props }
                                    getUser={getUser}
                                    getRepos={getRepos}
                                    user={user}
                                    repos={repos}
                                    loading={userLoading}/>
                            )}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>
    );

    async function getUser (login) {
        if(login){
            setUserLoading(true);
            const response = await Axios.get(`https://api.github.com/users/${login}`, githubConfig);
            setUser(response.data);
            setUserLoading(false);
            //console.log(response);
        }
    }

    async function getRepos(login){
        if(login){
            setReposLoading(true);
            const response = await Axios.get(`https://api.github.com/users/${login}/repos?per_page=${reposPerPage}&sort=created:asc`, githubConfig);
            setRepos(response.data);
            setReposLoading(false);
            //console.log(response);
        }
    }

    function setAlertMessage(message, type) {
        setAlert({message: message, type: type})

        setTimeout(() => { setAlert(null) }, 3000);
    }

    function clearBtn() { setUsersList([]) };
}

const reposPerPage = 5


const githubConfig = {
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
}
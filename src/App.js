import React, {Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User'
import Axios from 'axios';
import Search from './components/layout/Search'
import Alert from './components/layout/Alert'
import About from './components/pages/About'

export default class App extends React.Component {
    state  = {
        usersList: [],
        loading: false,
        alert: null,
        user: {},
        userLoading: false
    }

    // async componentDidMount(){
    //     this.setState({loading: true});
    //     const response = await Axios.get('https://api.github.com/users', githubConfig);
    //     this.setState({usersList: response.data, loading: false});
        
    //     console.log(response);
    // }
    
    render(){
        const {usersList, user, loading, userLoading} = this.state;

        return (
            <Router>
                <div className="App">
                    <Navbar title="Github Finder" icon="fab fa-github"/>
                    <div className="container">
                        <Alert alert={this.state.alert}/>
                        <Switch>
                            <Route exact path='/' render={props =>(
                                <Fragment>
                                    <Search
                                        searchText={this.searchText}
                                        clearBtn={this.clearBtn}
                                        showClearBtn={usersList.length > 0}
                                        setAlert={this.setAlert}
                                        />
                                    <Users users={ usersList } loading={loading} />
                                </Fragment>
                            )} 
                            />
                            <Route exact path='/about' component={About} />
                            <Route exact path='/user/:login' render={props => (
                                <User
                                    { ... props }
                                    getUser={this.getUser}
                                    user={user}
                                    loading={userLoading}/>
                            )}/>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }

    getUser = async (login) => {
        if(login){
            this.setState({userLoading: true});
            const response = await Axios.get(`https://api.github.com/users/${login}`, githubConfig);
            this.setState({user: response.data, userLoading: false});
            //console.log(response);
        }
        
    }

    setAlert = (message, type) => {
        this.setState({alert: {message: message, type: type}})

        setTimeout(() => {this.setState({alert: null})}, 3000);
    }

    searchText = async (text) => {
        if(text){
            this.setState({loading: true});
            const response = await Axios.get(`https://api.github.com/search/users?q=${text}`, githubConfig);
            this.setState({usersList: response.data.items, loading: false});
            
            console.log(response);
        }
    }

    clearBtn = () => this.setState({usersList: []});
}

const githubConfig = {
    headers: {
      Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`
    }
}
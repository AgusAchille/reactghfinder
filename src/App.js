import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Axios from 'axios'

export default class App extends React.Component {
    state  = {
        usersList: [],
        loading: false
    }

    async componentDidMount(){
        this.setState({loading: true});
        const response = await Axios.get('https://api.github.com/users', githubConfig);
        this.setState({usersList: response.data, loading: false});

        console.log(response);
    }

    render(){
        return (
            <div className="App">
                <Navbar title="Github Finder" icon="fab fa-github"/>
                <div className="container">
                    <Users users={ this.state.usersList } loading={this.state.loading}  />
                </div>
            </div>
        );
    }
}

const githubConfig = {
    headers: {
      Authorization: 'token e009b077d868fcf39f32f978cf1cec34a7b9e239'
    }
}
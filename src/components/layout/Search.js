import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Search extends Component {
    state = {
        text: ''
    }

    static propTypes = {
        searchText: PropTypes.func.isRequired,
        clearBtn: PropTypes.func.isRequired,
        showClearBtn: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired
    }

    onChange = e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e => {
        e.preventDefault();
        
        if(!this.state.text.trim())
            this.props.setAlert('Please enter something', 'light')
        else {
            this.props.searchText(this.state.text.trim());
            this.setState({ text: '' });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={ this.onSubmit } className="form">
                    <input
                        onChange={ this.onChange }
                        type="text"
                        value={ this.state.text }
                        name="text"
                        placeholder="Search Users..."
                    />
                    <input
                        type="submit"
                        value="Search"
                        className="btn btn-dark btn-block"
                    />
                    {
                        this.props.showClearBtn &&
                        <button
                        style={{ backgroundColor: 'orange', fontWeight: 'bold'}}
                        onClick={ this.props.clearBtn }
                        className="btn btn-block">
                        Clear
                        </button>
                    }
                </form>
            </div>
        )
    }
}

export default Search

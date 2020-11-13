import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import GithubContext from '../../Context/github/githubContext'

export default function Search ({ setAlert, showClearBtn, clearBtn }) {
    const githubContext = useContext(GithubContext);
    
    const [ text, setText ] = useState('');

    function onSubmit(e) {
        e.preventDefault();
        
        if(!text.trim())// if text is empty
            setAlert('Please enter something', 'light')
        else {
            githubContext.searchText(text.trim());
            setText('');
        }
    }

    return (
        <div>
            <form onSubmit={ onSubmit } className="form">
                <input
                    onChange={ e => setText(e.target.value) }
                    type="text"
                    value={ text }
                    name="text"
                    placeholder="Search Users..."
                />
                <input
                    type="submit"
                    value="Search"
                    className="btn btn-dark btn-block"
                />
                {
                    showClearBtn &&
                    <button
                    style={{ backgroundColor: 'orange', fontWeight: 'bold'}}
                    onClick={ clearBtn }
                    className="btn btn-block">
                    Clear
                    </button>
                }
            </form>
        </div>
    )
}

Search.propTypes = {
    clearBtn: PropTypes.func.isRequired,
    showClearBtn: PropTypes.bool.isRequired,
    setAlert: PropTypes.func.isRequired
}

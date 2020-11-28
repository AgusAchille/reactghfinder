import React, { useContext, useState } from 'react'
import GithubContext from '../../Context/github/githubContext'
import AlertContext from '../../Context/alert/alertContext'

export default function Search () {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext);
    
    const { setAlert } = alertContext;

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

    const showClearBtn = githubContext.usersList.length > 0;
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
                        onClick={ githubContext.clearUsers }
                        className="btn btn-block">
                        Clear
                    </button>
                }
            </form>
        </div>
    )
}
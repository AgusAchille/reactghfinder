import React from 'react'
import propTypes from 'prop-types'

export default function UserItem ({user: { login, avatar_url, html_url } }) {
    return (
        <div className='card text-center'>
            <img
                src = {avatar_url}
                className = 'round-img'
                style = {{ width: '60px' }}
                alt = ''
            />
            <h3>{login}</h3>
            <div>
                <a href={html_url} className='btn btn-dark btn-sm my-1' target='_blank' rel='noreferrer'>Profile</a>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: propTypes.object.isRequired
}
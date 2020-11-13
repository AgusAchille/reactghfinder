import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function UserItem ({user: { login, avatar_url } }) {
    return (
        <div className='card text-center'>
            <Link to={`/user/${login}`}>
                <img
                    src = {avatar_url}
                    className = 'round-img'
                    style = {{ width: '60px' }}
                    alt = ''
                />
            </Link>
            <h3>{login}</h3>
            <div>
                <Link to={`/user/${login}`} className='btn btn-dark btn-sm my-1'>Profile</Link>
            </div>
        </div>
    )
}

UserItem.propTypes = {
    user: propTypes.object.isRequired
}
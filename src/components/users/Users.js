import React, { Component } from 'react'
import UserItem from './UserItem'
import propTypes from 'prop-types'
import Spinner from '../layout/Spinner'

export default function Users({users, loading}) {
    
    if(loading)
        return <Spinner />
    else
        return (
            <div style={userGridStyle}>
                { users.map(user => <UserItem key={user.id} user={user}/>) }
            </div>)
}

Users.propTypes = {
    users: propTypes.array.isRequired,
    loading: propTypes.bool.isRequired
}

const userGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}
import React, { useContext } from 'react'
import UserItem from './UserItem'
import Spinner from '../layout/Spinner'
import GithubContext from '../../Context/github/githubContext'

export default function Users() {
    const githubContext = useContext(GithubContext);

    const { loading, usersList } = githubContext;

    if(loading)
        return <Spinner />
    else
        return (
            <div style={userGridStyle}>
                { usersList.map(user => <UserItem key={user.id} user={user}/>) }
            </div>)
}

const userGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}
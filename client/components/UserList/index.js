import React from 'react'
import { connect } from 'react-redux'

import {
  getAllUsers,
  getUserIsStreamingAudio,
} from 'app/reducers'

import styles from './styles.less'

const User = ({ imageUrl, name, isStreamingAudio, hasStage }) => {
  return <div className={styles.user}>
    <img className={styles.userImg} src={imageUrl} alt={name} />
    <span className={styles.userName}>
      {name}
    </span>
    <span className={styles.userIcon}>
      {isStreamingAudio && '🗣'}
    </span>
  </div>
}

const userMapStateToProps = (state, ownProps) => ({
  isStreamingAudio: getUserIsStreamingAudio(state, ownProps.id),
})

const ConnectedUser = connect(userMapStateToProps)(User)

const UserList = ({ users }) => {
  return <div className={styles.list}>
    {users.map(user => <ConnectedUser {...user} key={user.id} />)}
  </div>
}

const userListMapStateToProps = (state, ownProps) => ({
  users: getAllUsers(state),
})

export default connect(userListMapStateToProps)(UserList)

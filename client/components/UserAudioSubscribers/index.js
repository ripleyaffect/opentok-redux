import React from 'react'
import { connect } from 'react-redux'

import UserAudioSubscriber from 'app/components/UserAudioSubscriber'
import { getUsersStreamingAudio } from 'app/reducers'

import styles from './styles.less'

const UserAudioSubscribers = ({ userIds }) => {
  return <div className={styles.subscribers}>
    {userIds.map(userId =>
      <UserAudioSubscriber key={userId} userId={userId} />)}
  </div>
}

const mapStateToProps = (state) => ({
  userIds: getUsersStreamingAudio(state),
})

export default connect(mapStateToProps)(UserAudioSubscribers)

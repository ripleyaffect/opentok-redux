import React from 'react'
import { connect } from 'react-redux'

import Feeds from 'app/components/Feeds'
import Messages from 'app/components/Messages'
import SessionBar from 'app/components/SessionBar'
import UserAudioSubscribers from 'app/components/UserAudioSubscribers'
import UserList from 'app/components/UserList'
import { getMessagesVisible, getUserListIsVisible } from 'app/reducers'

import styles from './styles.less'

const Theater = ({ messagesVisible, userListVisible }) => {
  return <div className={styles.theater}>
    <Feeds />
    <UserAudioSubscribers />
    {messagesVisible && <Messages />}
    {userListVisible && <UserList />}
    <SessionBar />
  </div>
}

const mapStateToProps = (state) => ({
  messagesVisible: getMessagesVisible(state),
  userListVisible: getUserListIsVisible(state),
})

export default connect(mapStateToProps)(Theater);

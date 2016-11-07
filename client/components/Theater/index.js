import React from 'react'
import { connect } from 'react-redux'

import Feeds from 'app/components/Feeds'
import Messages from 'app/components/Messages'
import SessionBar from 'app/components/SessionBar'
import UserAudioSubscribers from 'app/components/UserAudioSubscribers'
import { getMessagesVisible } from 'app/reducers'

import styles from './styles.less'

const Theater = ({ messagesVisible }) => {
  return <div className={styles.theater}>
    <Feeds />
    {messagesVisible && <Messages />}
    <UserAudioSubscribers />
    <SessionBar />
  </div>
}

const mapStateToProps = (state) => ({
  messagesVisible: getMessagesVisible(state),
})

export default connect(mapStateToProps)(Theater);

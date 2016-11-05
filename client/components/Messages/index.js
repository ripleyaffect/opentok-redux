import React from 'react'
import { connect } from 'react-redux'

import { getAllMessages } from 'app/reducers'

import styles from './styles.less'

const Messages = ({ messages }) => {
  return <div className={styles.messages}>
    {messages.map(message => <div
        className={styles.message} key={message.id}>{message.content}</div>)}
  </div>
}

const mapStateToProps = (state) => ({
  messages: getAllMessages(state),
})

export default connect(mapStateToProps)(Messages)

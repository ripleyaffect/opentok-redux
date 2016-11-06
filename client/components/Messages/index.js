import React from 'react'
import { connect } from 'react-redux'

import Message from 'app/components/Message'
import { getAllMessages } from 'app/reducers'

import styles from './styles.less'

const Messages = ({ messages }) => {
  return <div className={styles.messages}>
    {messages.map(message => <Message {...message} key={message.id} />)}
  </div>
}

const mapStateToProps = (state) => ({
  messages: getAllMessages(state),
})

export default connect(mapStateToProps)(Messages)

import React from 'react'
import { connect } from 'react-redux'

import {
  signalMessage,
  signalSubscribeToUserAudio,
  signalUnsubscribeFromUserAudio,
} from 'app/actions'
import {
  getIsActiveConnection,
  getUserIsStreamingAudio,
} from 'app/reducers'

import styles from './styles.less'

class MessageBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
    }
  }

  handleMouseDownTalkButton = () => {
    this.props.dispatchSignalSubscribeToUserAudio()
  }

  handleMouseUpTalkButton = () => {
    this.props.dispatchSignalUnsubscribeFromUserAudio()
  }

  handleClickThumbsUp = () => {
    this.props.dispatchSignalMessage({
      content: '👍',
    })
  }

  handleClickThumbsDown = () => {
    this.props.dispatchSignalMessage({
      content: '👎',
    })
  }

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value })
  }

  handleSubmitForm = (event) => {
    event.preventDefault()

    this.props.dispatchSignalMessage({
      content: this.state.message,
    })

    this.setState({ message: '' })
  }

  render() {
    const { userIsActiveConnection, userIsStreamingAudio } = this.props

    return <div className={styles.bar}>
      {userIsActiveConnection ? 
        <button
            className={`${styles.button} ${styles.talkButton} ${styles.disabled}`}>
          🎙 Streaming
        </button>
      : <button
            className={
              `${styles.button} ${styles.talkButton} ${userIsStreamingAudio ? styles.active : ''}`}
            onMouseDown={this.handleMouseDownTalkButton}
            onMouseUp={this.handleMouseUpTalkButton}>
          🎙 {userIsStreamingAudio ? 'Streaming...' : 'Press to talk'}
        </button>}
      <form className={styles.form} onSubmit={this.handleSubmitForm}>
        <input
            className={styles.message}
            onChange={this.handleMessageChange}
            placeholder="Send a message"
            type="text"
            value={this.state.message} />
      </form>
      <button className={styles.button} onClick={this.handleClickThumbsUp}>👍</button>
      <button className={styles.button} onClick={this.handleClickThumbsDown}>👎</button>
    </div>
  } 
}

const mapStateToProps = (state) => {
  return {
    userIsStreamingAudio: getUserIsStreamingAudio(state),
    userIsActiveConnection: getIsActiveConnection(state),
  }
}

const mapDispatchToProps = {
  dispatchSignalMessage: signalMessage,
  dispatchSignalSubscribeToUserAudio: signalSubscribeToUserAudio,
  dispatchSignalUnsubscribeFromUserAudio: signalUnsubscribeFromUserAudio,
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar)

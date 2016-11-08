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

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.removeEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown = (event) => {
    if (!this.props.userIsActiveConnection && event.ctrlKey && event.altKey) {
      this.props.dispatchSignalSubscribeToUserAudio()
    }
  }

  handleKeyUp = (event) => {
    if (this.props.userIsStreamingAudio && !(event.ctrlKey && event.altKey)) {
      this.props.dispatchSignalUnsubscribeFromUserAudio()
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

  handleClickRaiseHand = () => {
    this.props.dispatchSignalMessage({
      content: '✋',
      type: 'raiseHand',
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
          🎙 {userIsStreamingAudio ? 'Streaming' : 'Hold to talk'}
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
      <button className={styles.button} onClick={this.handleClickRaiseHand}>✋</button>
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

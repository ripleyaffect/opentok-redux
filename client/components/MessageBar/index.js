import React from 'react'
import { connect } from 'react-redux'

import { signalMessage } from 'app/actions'

import styles from './styles.less'

class MessageBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
    }
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
    return <div className={styles.bar}>
      <form className={styles.form} onSubmit={this.handleSubmitForm}>
        <input
            className={styles.message}
            onChange={this.handleMessageChange}
            type="text"
            value={this.state.message} />
      </form>
      <button className={styles.button} onClick={this.handleClickThumbsUp}>👍</button>
      <button className={styles.button} onClick={this.handleClickThumbsDown}>👎</button>
    </div>
  } 
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  dispatchSignalMessage: signalMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar)

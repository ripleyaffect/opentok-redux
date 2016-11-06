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

  handleMessageChange = (event) => {
    this.setState({ message: event.target.value })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    this.props.dispatchSignalMessage({
      content: this.state.message,
    })

    this.setState({ message: '' })
  }

  render() {
    return <form className={styles.bar} onSubmit={this.handleFormSubmit}>
      <input
          className={styles.message}
          onChange={this.handleMessageChange}
          type="text"
          value={this.state.message} />
    </form>
  } 
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  dispatchSignalMessage: signalMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageBar)

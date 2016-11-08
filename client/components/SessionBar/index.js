import React from 'react'
import { connect } from 'react-redux'

import {
  signalJoinPing,
  toggleMessagesVisible,
  toggleUserListVisible,
} from 'app/actions'
import { getAllUsers, getMessagesVisible } from 'app/reducers'

import styles from './styles.less'

class SessionBar extends React.Component {
  componentWillMount() {
    this.props.dispatchSignalJoinPing()
  }

  handleClickToggleMessagesVisible = () => {
    this.props.dispatchToggleMessagesVisible()
  }

  handleClickToggleUserListVisible = () => {
    this.props.dispatchToggleUserListVisible()
  }

  render() {
    const { messagesVisible, users } = this.props

    return <div className={styles.bar}>
      <button
          className={styles.button}
          onClick={this.handleClickToggleUserListVisible}>
        👥 {users.length}
      </button>
      <button
          className={styles.button}
          onClick={this.handleClickToggleMessagesVisible}>
        💬 {messagesVisible ? 'on' : 'off'}
      </button>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    users: getAllUsers(state),
    messagesVisible: getMessagesVisible(state),
  }
}

const mapDispatchToProps = {
  dispatchSignalJoinPing: signalJoinPing,
  dispatchToggleMessagesVisible: toggleMessagesVisible,
  dispatchToggleUserListVisible: toggleUserListVisible,
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionBar)

import React from 'react'
import { connect } from 'react-redux'

import {
  addStream,
  connectToSession,
  removeStream,
  receiveMessage,
} from 'app/actions'
import Feed from 'app/components/Feed'
import MessageBar from 'app/components/MessageBar'

class Session extends React.Component {
  componentDidMount() {
    this.props.dispatchConnectToSession()
  }

  componentWillReceiveProps(newProps) {
    const { session } = newProps

    // Register handlers if session
    if (!this.props.session && session) {
      session.on('streamCreated', this.props.dispatchAddStream)
      session.on('streamDestroyed', this.props.dispatchRemoveStream)
      session.on('signal:message', this.props.dispatchReceiveMessage)
    }
  }

  render() {
    const { session } = this.props

    return session ?
      <div>
        <Feed />
        <MessageBar />
      </div>
    : <div />
  }
}

const mapStateToProps = (state, ownProps) => {
  return { session: state.session }
}

const mapDispatchToProps = {
  dispatchConnectToSession: connectToSession,
  dispatchAddStream: addStream,
  dispatchRemoveStream: removeStream,
  dispatchReceiveMessage: receiveMessage,
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)

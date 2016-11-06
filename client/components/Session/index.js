import React from 'react'
import { connect } from 'react-redux'

import {
  connectToSession,
  handleConnectionCreated,
  handleConnectionDestroyed,
  handleSignalIdentify,
  handleSignalMessage,
  handleStreamCreated,
  handleStreamDestroyed,
} from 'app/actions'
import Theater from 'app/components/Theater'
import MessageBar from 'app/components/MessageBar'
import { getSession } from 'app/reducers'

class Session extends React.Component {
  componentDidMount() {
    this.props.dispatchConnectToSession()
  }

  componentWillReceiveProps(newProps) {
    const { session } = newProps

    // Register handlers on session creation
    if (!this.props.session && session) {
      session.on({
        connectionCreated: this.props.dispatchHandleConnectionCreated,
        connectionDestroyed: this.props.dispatchHandleConnectionDestroyed,
        streamCreated: this.props.dispatchHandleStreamCreated,
        streamDestroyed: this.props.dispatchHandleStreamDestroyed,
        'signal:message': this.props.dispatchHandleSignalMessage,
        'signal:identify': this.props.dispatchHandleSignalIdentify,
      })
    }
  }

  render() {
    const { session } = this.props

    return <div>
      {session && <Theater />}
      {session && <MessageBar />}
    </div>
  }
}

const mapStateToProps = (state) => ({
  session: getSession(state),
})

const mapDispatchToProps = {
  dispatchConnectToSession: connectToSession,
  dispatchHandleConnectionCreated: handleConnectionCreated,
  dispatchHandleConnectionDestroyed: handleConnectionDestroyed,
  dispatchHandleStreamCreated: handleStreamCreated,
  dispatchHandleSignalMessage: handleSignalMessage,
  dispatchHandleSignalIdentify: handleSignalIdentify,
  dispatchHandleStreamDestroyed: handleStreamDestroyed,
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)

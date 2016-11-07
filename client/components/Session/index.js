import React from 'react'
import { connect } from 'react-redux'

import {
  connectToSession,
  handleConnectionCreated,
  handleConnectionDestroyed,
  handleSignalActiveConnectionPing,
  handleSignalIdentify,
  handleSignalMessage,
  handleSignalSetActiveConnectionId,
  handleSignalSubscribeToUserAudio,
  handleSignalUnsubscribeFromUserAudio,
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
        'signal:activeConnectionPing': this.props.dispatchHandleSignalActiveConnectionPing,
        'signal:message': this.props.dispatchHandleSignalMessage,
        'signal:identify': this.props.dispatchHandleSignalIdentify,
        'signal:setActiveConnectionId': this.props.dispatchHandleSignalSetActiveConnectionId,
        'signal:subscribeToUserAudio': this.props.dispatchHandleSignalSubscribeToUserAudio,
        'signal:unsubscribeFromUserAudio': this.props.dispatchHandleSignalUnsubscribeFromUserAudio,
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
  dispatchHandleSignalActiveConnectionPing: handleSignalActiveConnectionPing,
  dispatchHandleSignalMessage: handleSignalMessage,
  dispatchHandleSignalSetActiveConnectionId: handleSignalSetActiveConnectionId,
  dispatchHandleSignalIdentify: handleSignalIdentify,
  dispatchHandleStreamCreated: handleStreamCreated,
  dispatchHandleStreamDestroyed: handleStreamDestroyed,
  dispatchHandleSignalSubscribeToUserAudio: handleSignalSubscribeToUserAudio,
  dispatchHandleSignalUnsubscribeFromUserAudio: handleSignalUnsubscribeFromUserAudio,
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)

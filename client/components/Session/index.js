import React from 'react'
import { connect } from 'react-redux'

import { connectToSession, subscribeToStream } from 'app/actions'
import Publisher from 'app/components/Publisher'

class Session extends React.Component {
  componentDidMount() {
    this.props.dispatchConnectToSession()
  }

  componentWillReceiveProps(newProps) {
    const { session } = newProps

    // Register handlers if session
    if (!this.props.session && session) {
      session.on('streamCreated', this.props.dispatchSubscribeToStream)
    }
  }

  render() {
    const { session } = this.props

    return session ?
      <div>
        <h1>session!</h1>
        <Publisher />
      </div>
    : <div />
  }
}

const mapStateToProps = (state, ownProps) => {
  return { session: state.session }
}

const mapDispatchToProps = {
  dispatchConnectToSession: connectToSession,
  dispatchSubscribeToStream: subscribeToStream,
}

export default connect(mapStateToProps, mapDispatchToProps)(Session)

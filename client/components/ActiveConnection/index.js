import React from 'react'
import { connect } from 'react-redux'

import { signalSetActiveConnectionId } from 'app/actions'
import Subscriber from 'app/components/Subscriber'
import {
  getActiveConnectionId,
  getConnectionStreams,
  getSessionConnectionId,
} from 'app/reducers'

class ActiveConnection extends React.Component {
  handleClickTakePodium = () => {
    this.props.dispatchSignalSetActiveConnectionId(this.props.sessionConnectionId)
  }

  render() {
    const {
      activeConnectionId,
      isSelf=false,
      sessionConnectionId,
      streams=[],
    } = this.props

    console.log(streams)

    return <div>
      {!activeConnectionId && <div>
        <p>There is no active stream</p>
        <button onClick={this.handleClickTakePodium}>😎 Take podium</button>
      </div>}
      {activeConnectionId === sessionConnectionId ?
        <p>You have the podium</p>
      : streams.map(stream =>
          <Subscriber key={stream.id} streamId={stream.id} />)}
    </div>
  }
}

const mapStateToProps = (state) => {
  const activeConnectionId = getActiveConnectionId(state)
  const sessionConnectionId = getSessionConnectionId(state)

  console.log(activeConnectionId)

  return {
    activeConnectionId,
    sessionConnectionId,
    isSelf: activeConnectionId === sessionConnectionId,
    streams: activeConnectionId ?
      getConnectionStreams(state, activeConnectionId) : []
  }
}

const mapDispatchToProps = {
  dispatchSignalSetActiveConnectionId: signalSetActiveConnectionId,
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveConnection)

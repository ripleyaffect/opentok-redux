import React from 'react'
import { connect } from 'react-redux'

import { signalSetActiveConnectionId } from 'app/actions'
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
    </div>
  }
}

const mapDispatchToProps = {
  dispatchSignalSetActiveConnectionId: signalSetActiveConnectionId,
}

export default connect(() => {}, mapDispatchToProps)(ActiveConnection)


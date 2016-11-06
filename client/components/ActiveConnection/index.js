import React from 'react'
import { connect } from 'react-redux'

import ActiveConnectionDashboard from 'app/components/ActiveConnectionDashboard'
import ActiveConnectionFallback from 'app/components/ActiveConnectionFallback'
import ActiveConnectionStreams from 'app/components/ActiveConnectionStreams'
import { getActiveConnectionId, getSessionConnectionId } from 'app/reducers'

const ActiveConnection = ({ activeConnectionId, sessionConnectionId }) => {
  switch (activeConnectionId) {
    case null:
      return <ActiveConnectionFallback />
    case sessionConnectionId:
      return <ActiveConnectionDashboard />
    default:
      return <ActiveConnectionStreams connectionId={activeConnectionId} />
  }
}

const mapStateToProps = (state) => ({
  activeConnectionId: getActiveConnectionId(state),
  sessionConnectionId: getSessionConnectionId(state),
})

export default connect(mapStateToProps)(ActiveConnection)

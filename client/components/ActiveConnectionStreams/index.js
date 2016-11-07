import React from 'react'
import { connect } from 'react-redux'

import Subscriber from 'app/components/Subscriber'
import { getActiveConnectionId, getConnectionStreams } from 'app/reducers'

const ActiveConnectionStreams = ({ streams }) => {
  return <div>
    {streams.map(stream => <Subscriber key={stream.id} streamId={stream.id} />)}
  </div>
}

const mapStateToProps = (state, { connectionId }) => ({
  streams: getConnectionStreams(state, connectionId),
})

export default connect(mapStateToProps)(ActiveConnectionStreams)

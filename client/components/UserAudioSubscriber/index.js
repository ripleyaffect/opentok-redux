import React from 'react'
import { connect } from 'react-redux'

import Message from 'app/components/Message'
import Subscriber from 'app/components/Subscriber'
import { getConnectionStreams, getUser, getUserConnection } from 'app/reducers'

const UserAudioSubscriber = ({ streamId, user }) => {
  return <div>
    <Message
        content={streamId === null ? 'Error: no stream found' : null}
        id={user.id}
        type="userAudioSubscriber"
        user={user} />
    {streamId && <Subscriber
        className="hidden"
        options={{ height: '0px', subscribeToVideo: false, width: '0px' }}
        streamId={streamId} />}
  </div>
}

const mapStateToProps = (state, ownProps) => {
  let streamId = null
  // Find the correct streamId
  const userConnection = getUserConnection(state, ownProps.userId)
  if (!userConnection) {
    console.log('Cannot find user connection')
  }
  else {
    const userStreams = getConnectionStreams(state, userConnection.id)
    if (!userStreams || userStreams.length === 0) {
      console.log('Cannot find user streams')
    }
    else {
      streamId = userStreams[0].id
    }
  }

  return {
    streamId,
    user: getUser(state, ownProps.userId),
  }
}

export default connect(mapStateToProps)(UserAudioSubscriber)

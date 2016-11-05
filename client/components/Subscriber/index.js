import React from 'react'
import { connect } from 'react-redux'

import { subscribeToStream } from 'app/actions'
import { getStream, getStreamNodeId } from 'app/reducers'

class Subscriber extends React.Component {
  componentDidMount() {
    if (this.props.stream) {
      this.props.dispatchSubscribeToStream(this.props.stream, this.props.options)
    }
    else {
      console.log('No stream to subscribe to')
    }
  }

  render() {
    return <div id={this.props.nodeId} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const stream = getStream(state, ownProps.streamId)
  return {
    nodeId: getStreamNodeId(state, stream),
    stream,
  }
}

const mapDispatchToProps = {
  dispatchSubscribeToStream: subscribeToStream,
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriber)

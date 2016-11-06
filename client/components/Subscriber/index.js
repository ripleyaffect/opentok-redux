import React from 'react'
import { connect } from 'react-redux'

import { subscribeToStream, unsubscribeFromStream } from 'app/actions'
import { getStream, getStreamNodeId } from 'app/reducers'

import styles from './styles.less'

class Subscriber extends React.Component {
  componentDidMount() {
    const { dispatchSubscribeToStream, options, stream } = this.props

    if (stream) {
      dispatchSubscribeToStream(stream, options)
    }
    else {
      console.log('No stream to subscribe to')
    }
  }

  componentWillUnmount() {
    const { dispatchUnsubscribeFromStream, stream } = this.props

    if (stream) {
      dispatchUnsubscribeFromStream(stream)
    }
    else {
      console.log('No stream to unsubscribe from')
    }
  }

  render() {
    return <div className={styles.subscriber} id={this.props.nodeId} />
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
  dispatchUnsubscribeFromStream: unsubscribeFromStream,
}

export default connect(mapStateToProps, mapDispatchToProps)(Subscriber)

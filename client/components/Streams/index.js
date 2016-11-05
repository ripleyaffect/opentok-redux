import React from 'react'
import { connect } from 'react-redux'

import Subscriber from 'app/components/Subscriber'
import { getAllStreams } from 'app/reducers'

class Streams extends React.Component {
  render() {
    const { streams } = this.props

    return <div>
      {streams.map(stream => <Subscriber key={stream.id} streamId={stream.id}/>)}
    </div>
  }
}

const mapStateToProps = (state) => ({
  streams: getAllStreams(state),
})

export default connect(mapStateToProps)(Streams)

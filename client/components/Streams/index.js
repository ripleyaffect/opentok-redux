import React from 'react'
import { connect } from 'react-redux'

import { getAllStreams } from 'app/reducers'

class Streams extends React.Component {
  render() {
    const { streams } = this.props

    return <div>
      {streams.map(stream => <p key={stream.id}>{stream.id}</p>)}
    </div>
  }
}

const mapStateToProps = (state) => ({
  streams: getAllStreams(state),
})

export default connect(mapStateToProps)(Streams)

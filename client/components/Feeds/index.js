import React from 'react'
import { connect } from 'react-redux'

import Publisher from 'app/components/Publisher'
import Streams from 'app/components/Streams'

class Feeds extends React.Component {
  render() {
    return <div>
      <Streams />
      <Publisher />
    </div>
  }
}

export default Feeds

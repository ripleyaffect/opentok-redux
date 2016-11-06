import React from 'react'
import { connect } from 'react-redux'

import Publisher from 'app/components/Publisher'
import ActiveConnection from 'app/components/ActiveConnection'

class Feeds extends React.Component {
  render() {
    return <div>
      <ActiveConnection />
      <Publisher />
    </div>
  }
}

export default Feeds

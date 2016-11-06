import React from 'react'
import { connect } from 'react-redux'

import { signalJoinPing } from 'app/actions'

class SessionBar extends React.Component {
  componentWillMount() {
    this.props.dispatchSignalJoinPing()
  }
  render() {
    return <div />
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = {
  dispatchSignalJoinPing: signalJoinPing,
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionBar)

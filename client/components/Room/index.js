import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { fetchToken } from 'app/actions'
import Session from 'app/components/Session'

class Room extends React.Component {
  componentDidMount() {
    this.props.dispatchFetchToken(this.props.name)
  }

  render() {
    const { name, sessionId } = this.props

    return <div className="page about-page">
      {sessionId && <Session />}
    </div>
  }
}

const mapStateToProps = (state, ownProps) => ({
  name: ownProps.params.roomName,
  sessionId: state.sessionId,
})

const mapDispatchToProps = {
  dispatchFetchToken: fetchToken,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Room))

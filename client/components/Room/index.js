import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { fetchSessionToken } from 'app/actions'

import Session from 'app/components/Session'
import { getSessionId } from 'app/reducers'

class Room extends React.Component {
  componentDidMount() {
    this.props.dispatchFetchSessionToken(this.props.name)
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
  sessionId: getSessionId(state),
})

const mapDispatchToProps = {
  dispatchFetchSessionToken: fetchSessionToken,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Room))

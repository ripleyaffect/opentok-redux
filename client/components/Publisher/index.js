import React from 'react'
import { connect } from 'react-redux'

import { publishToSession } from 'app/actions'

class Publisher extends React.Component {
  componentDidMount() {
    this.props.dispatchPublishToSession()
  }

  render() {
    const { publisher } = this.props

    return publisher ? <h1>publisher!</h1> : <div />
  }
}

const mapStateToProps = (state, ownProps) => ({
  publisher: state.publisher,
})

const mapDispatchToProps = {
  dispatchPublishToSession: publishToSession,
}

export default connect(mapStateToProps, mapDispatchToProps)(Publisher)

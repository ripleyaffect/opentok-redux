import React from 'react'
import { connect } from 'react-redux'

import {
  signalActiveConnectionPing,
  signalSetActiveConnectionId,
} from 'app/actions'
import { getSessionConnectionId } from 'app/reducers'

import styles from 'app/Components/ActiveConnection/styles.less'

class ActiveConnectionDashboard extends React.Component {
  componentDidMount() {
    this.pingInterval = setInterval(
      this.props.dispatchSignalActiveConnectionPing, 3000)
  }

  componentWillUnmount() {
    clearInterval(this.pingInterval)
  }

  handleClickGiveUpStage = () => {
    this.props.dispatchSignalSetActiveConnectionId(null)
  }

  render() {
    return <div className={styles.dashboard}>
      <h3>You have the stage</h3>
      <button
          className={styles.button}
          onClick={this.handleClickGiveUpStage}>
        🙈 Give up the stage
      </button>
    </div>
  }
}

const mapStateToProps = (state) => ({
  sessionConnectionId: getSessionConnectionId(state),
})

const mapDispatchToProps = {
  dispatchSignalActiveConnectionPing: signalActiveConnectionPing,
  dispatchSignalSetActiveConnectionId: signalSetActiveConnectionId,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveConnectionDashboard)

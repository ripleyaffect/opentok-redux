import React from 'react'
import { connect } from 'react-redux'

import { signalSetActiveConnectionId } from 'app/actions'
import { getSessionConnectionId } from 'app/reducers'

import styles from 'app/Components/ActiveConnection/styles.less'

class ActiveConnectionFallback extends React.Component {
  handleClickTakeStage = () => {
    this.props.dispatchSignalSetActiveConnectionId(
      this.props.sessionConnectionId)
  }

  render() {
    return <div className={styles.dashboard}>
      <h3>No one has the stage</h3>
      <button
          className={styles.button}
          onClick={this.handleClickTakeStage}>
        💃 Take the stage
      </button>
    </div>
  }
}

const mapStateToProps = (state) => ({
  sessionConnectionId: getSessionConnectionId(state),
})

const mapDispatchToProps = {
  dispatchSignalSetActiveConnectionId: signalSetActiveConnectionId
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveConnectionFallback)

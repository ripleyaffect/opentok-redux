import React from 'react'
import { connect } from 'react-redux'

import { publishToSession } from 'app/actions'

import styles from './styles.less'

class Publisher extends React.Component {
  componentDidMount() {
    this.props.dispatchPublishToSession()
  }

  render() {
    const { publisher } = this.props

    return <div id="publisher-container" className={styles.publisher} />
  }
}

const mapStateToProps = (state, ownProps) => ({
  publisher: state.publisher,
})

const mapDispatchToProps = {
  dispatchPublishToSession: publishToSession,
}

export default connect(mapStateToProps, mapDispatchToProps)(Publisher)

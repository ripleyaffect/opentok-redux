import React from 'react'

import Feeds from 'app/components/Feeds'
import Messages from 'app/components/Messages'
import SessionBar from 'app/components/SessionBar'

import styles from './styles.less'

const Theater = () => {
  return <div className={styles.theater}>
    <SessionBar />
    <Feeds />
    <Messages />
  </div>
}

export default Theater;

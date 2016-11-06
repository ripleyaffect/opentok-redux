import React from 'react'

import Messages from 'app/components/Messages'
import Publishers from 'app/components/Publishers'
import SessionBar from 'app/components/SessionBar'
import Streams from 'app/components/Streams'

import styles from './styles.less'

const Theater = () => {
  return <div className={styles.theater}>
    <SessionBar />
    <Streams />
    <Publishers />
    <Messages />
  </div>
}

export default Theater;

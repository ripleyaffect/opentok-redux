import React from 'react'

import Messages from 'app/components/Messages'
import Publishers from 'app/components/Publishers'
import SessionBar from 'app/components/SessionBar'
import Streams from 'app/components/Streams'

import styles from './styles.less'

const Feed = () => {
  return <div className={styles.feed}>
    <SessionBar />
    <Streams />
    <Publishers />
    <Messages />
  </div>
}

export default Feed;

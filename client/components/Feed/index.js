import React from 'react'

import Messages from 'app/components/Messages'
import Publishers from 'app/components/Publishers'
import Streams from 'app/components/Streams'

import styles from './styles.less'

const Feed = () => {
  return <div className={styles.feed}>
    <Streams />
    <Publishers />
    <Messages />
  </div>
}

export default Feed;

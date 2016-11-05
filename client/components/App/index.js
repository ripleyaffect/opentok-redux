import React from 'react'

import styles from './styles.less'

const App = ({ children }) => {
  return <div className={styles.app}>
    {children}
  </div>
}

export default App

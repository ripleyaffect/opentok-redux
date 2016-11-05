import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from 'app/components/App'
import Room from 'app/components/Room'

export default () => {
  return <Route path="/" component={App}>
    <Route path=":roomName" component={Room} />
  </Route>
}
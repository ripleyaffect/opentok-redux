import React from 'react'
import { IndexRoute, Route } from 'react-router'

import App from 'app/components/App'
import HomePage from 'app/components/HomePage'
import Room from 'app/components/Room'

export default () => {
  return <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path=":roomName" component={Room} />
  </Route>
}
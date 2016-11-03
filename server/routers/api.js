const OpenTok = require('opentok')
const { Router } = require('express')

const { OPENTOK_API_KEY, OPENTOK_SECRET } = require('../config')

const router = Router()
const opentok = OpenTok(OPENTOK_API_KEY, OPENTOK_SECRET)

let sessionIdByRoom = {}

router.get('/', (req, res) => {
  res.json({ hello: 'friend' })
})

router.get('/rooms/:roomName/token', (req, res) => {
  const roomName = req.params.roomName
  let session = sessionIdByRoom[roomName]

  // Upsert the session
  if (!session) {
    opentok.createSession({}, function(error, opentokSession) {
      if (error) {
        console.log("Error creating session:", error)
        res.json({ error })
      }
      else {
        sessionId = opentokSession.sessionId;
        sessionIdByRoom[roomName] = sessionId;
        console.log(`Created sessionId for ${roomName}: ${sessionId}`);
        res.send({
          apiKey: OPENTOK_API_KEY,
          sessionId,
          token: opentok.generateToken(sessionId, {
            expireTime : (new Date().getTime() / 1000)+(7 * 24 * 60 * 60),
          })
        })
      }
    })
  }
  else {
    console.log(`Found sessionId for ${roomName}: ${sessionId}`);
    res.send({
      apiKey: OPENTOK_API_KEY,
      sessionId,
      token: opentok.generateToken(sessionId, {
        expireTime : (new Date().getTime() / 1000)+(7 * 24 * 60 * 60),
      })
    })
  }

})

module.exports = router

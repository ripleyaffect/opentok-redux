import React from 'react'
import { connect } from 'react-redux'

import { getCurrentUser } from 'app/reducers'

import styles from './styles.less'

const getMessageHeaderExtraText = (type) => {
  switch (type) {
    case 'joinPing':
      return 'joined the room'
    case 'leavePing':
      return 'left the room'
    case 'activeConnectionNotice':
      return 'has the stage'
    case 'activeConnectionTakenNotice':
      return 'took the stage'
    case 'userAudioSubscriber':
      return 'is streaming audio'
    default:
      return ''
  }
}

const MessageHeader = ({ currentUser, id, type, user }) => {
  return <div className={styles.header}>
    <img className={styles.userImg} src={user.imageUrl} alt={user.name} />
    <span className={styles.userName}>
      {currentUser && currentUser.id == user.id ? 'You' : user.name}
    </span>
    <span className={styles.extraText}>{getMessageHeaderExtraText(type)}</span>
  </div>
}

class Message extends React.Component {
  componentWillMount() {
    // Play a ding if hand is raised
    if (this.props.type === 'raiseHand') {
      var snd = new Audio('/static/ding.wav')
      snd.play();
    }
  }

  render() {
    const { content, currentUser, id, type, user } = this.props

    return <div className={styles.message}>
      <MessageHeader currentUser={currentUser} id={id} type={type} user={user} />
      {content && <div className={styles.content}>{content}</div>}
    </div>
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: getCurrentUser(state),
})

export default connect(mapStateToProps)(Message)

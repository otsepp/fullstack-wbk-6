import React from 'react'
import {connect} from 'react-redux'
import {resetMessage} from '../actions'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
		
		setTimeout(() => {
			this.props.resetMessage()
		}, 10000)
		
    return (
      <div style={style}>
				{this.props.notification}
			</div>
    )
  }
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

const ConnectedNotification = connect(
	mapStateToProps, {resetMessage}
)(Notification)

export default ConnectedNotification

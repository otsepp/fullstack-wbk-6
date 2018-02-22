import React from 'react'
import {connect} from 'react-redux'
import {create, setMessage} from '../actions'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
		e.target.anecdote.value = ''
		this.props.create(content)
		this.props.setMessage(`Created new anecdote: '${content}'`)
  }
   render() {
     return (
       <div>
      <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
     )
   }
}

export default connect(
	null, {create, setMessage}
)(AnecdoteForm)

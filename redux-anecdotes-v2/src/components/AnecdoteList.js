import React from 'react'
import {connect} from 'react-redux'
import {vote, setMessage} from '../actions'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
	
	voteAnecdote = async (anecdote) => {
		//await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
		//this.props.vote(anecdote.id)
		this.props.vote(anecdote)
		this.props.setMessage(`Voted for message '${anecdote.content}'`)
	}	
	
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => {this.voteAnecdote(anecdote)}}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
	return anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
}

const mapStateToProps = (state) => {
	return {
		anecdotes: anecdotesToShow(state.anecdotes, state.filter)
	}
}

const connectedAnecdoteList = connect(
	mapStateToProps, {vote, setMessage}
)(AnecdoteList)

export default connectedAnecdoteList

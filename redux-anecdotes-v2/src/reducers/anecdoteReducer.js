//const getId = () => (100000*Math.random()).toFixed(0)

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
} */

import anecdoteService from '../services/anecdotes'

const initialState = []

const CREATE = 'CREATE'
const VOTE = 'VOTE'
const INIT = 'INIT'


export const vote = (anecdote) => {
	return async (dispatch) => {
		await anecdoteService.update({...anecdote, votes: anecdote.votes + 1})
		dispatch({
			type: VOTE, id: anecdote.id
		})
	}
}

export const create = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: CREATE, anecdote: newAnecdote
		})
	}
}

export const initialize = (data) => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: INIT, data: anecdotes
		})
	}
	/*return {
		type: INIT, data
	}*/
}

const anecdoteReducer = (store = initialState, action) => {
  if (action.type === VOTE) {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === CREATE) {
		return store.concat(action.anecdote)
  }
	if (action.type === INIT) {
		return action.data
	}
	
  return store
}

export default anecdoteReducer
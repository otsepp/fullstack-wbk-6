//const getId = () => (100000*Math.random()).toFixed(0)

/*const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
} */

const initialState = []

const CREATE = 'CREATE'
const VOTE = 'VOTE'
const INIT = 'INIT'


export const vote = (id) => {
	return {type: VOTE, id}
}

export const create = (anecdote) => {
	return {type: CREATE, anecdote}
}

export const initialize = (data) => {
	
	return {
		type: INIT, data
	}
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
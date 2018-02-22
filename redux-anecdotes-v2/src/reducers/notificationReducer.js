const initialState = ''

const SET_MESSAGE = 'SET_MESSAGE'
const RESET_MESSAGE = 'RESET_MESSAGE'

export const setMessage = (message) => {
	return {type: SET_MESSAGE, message}
}

export const resetMessage = () => {
	return {type: RESET_MESSAGE}
}

const notificationReducer = (store = initialState, action) => {
	switch (action.type) {
		case SET_MESSAGE:
			return action.message
		case RESET_MESSAGE:
			return initialState
		default: 
			return store
	}
}

export default notificationReducer
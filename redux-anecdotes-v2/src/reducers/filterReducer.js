const initialState = ''

const SET_FILTER = 'SET_FILTER'

export const setFilter = (filter) => {
	return {type: SET_FILTER, filter}
}

const filterReducer = (store = initialState, action) => {
	switch (action.type) {
		case SET_FILTER:
			return action.filter
		default:	
			return store
	}
}

export default filterReducer
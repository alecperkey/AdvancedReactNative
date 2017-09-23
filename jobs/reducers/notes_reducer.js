import { Map, List, OrderedSet, fromJS } from 'immutable';

const INITIAL_STATE = fromJS({ documents: [], editor: {}, idFilterSet: new Set() });

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case 'SOCKET_CONNECT':
			return state.merge({
				socketId: action.socketId,
				socketStatus: true
			})

		case 'SOCKET_DISCONNECT':
			return state.merge({
				socketStatus: false
			})

		case 'REQUEST_EDITING':
			return state.merge({
				fetching: true
			})

		case 'RELEASE_EDITING':
			return state.merge({
				fetching: false
			})

		case 'SET_QUERY_FILTER':
			return state.merge({
				idFilterSet: action.idFilterSet
			})

		case 'CLEAR_QUERY_FILTER':
			return state.merge({
				idFilterSet: new OrderedSet(state.get('documents').map(doc => doc.id))
			})

		case 'SERVER_ADD_DOC':
			return state.merge({
				documents: state.get('documents').push(action.doc),
				idFilterSet: state.get('idFilterSet').add(action.doc.id)
			})

		case 'SERVER_DELETE_DOC':
			return state.merge({
				documents: state.get('documents').filter(doc => {
					return doc.id !== action.doc.id
				})
			})

		case 'SERVER_UPDATE_DOC':
			return state.merge({
				documents: state.get('documents').map(doc => {
					return 	doc.id === action.doc.id ?
							action.doc :
							doc
				})
			})

		case 'CREATE_DOC_SUCCESS':
			// While I don't this is proper redux convention. I have this code here
			// so that a newly created document will be within view.
			window.scrollTo(0, document.body.scrollHeight)

			return state.merge({
				fetching: false
			})

		case 'DELETE_DOC_SUCCESS':
			return state.merge({
				fetching: false,
				documents: state.get('documents').filter(doc => {
					return doc.id !== action.doc.id
				})
			})

		case 'UPDATE_DOC_SUCCESS':
			return state.merge({
				fetching: false,
				documents: state.get('documents').map(doc => {
					return 	doc.id === action.doc.id ?
							action.doc :
							doc
				})
			})

		case 'LOAD_DOCS_SUCCESS':
			return state.merge({
				fetching: false,
				documents: action.documents,
				idFilterSet: new OrderedSet(action.documents.map(doc => doc.id))
			})

		case 'CREATE_DOC_REQUEST':
		case 'DELETE_DOC_REQUEST':
		case 'UPDATE_DOC_REQUEST':
		case 'LOAD_DOCS_REQUEST':
			return state.merge({
				fetching: true
			})

		case 'CREATE_DOC_FAILURE':
		case 'DELETE_DOC_FAILURE':
		case 'UPDATE_DOC_FAILURE':
		case 'LOAD_DOCS_FAILURE':
			return state.merge({
				fetching: false,
				error: action.error
			})
	}

	return state
}
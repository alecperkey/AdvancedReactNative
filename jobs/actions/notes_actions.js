import { Map, List } from 'immutable'
import request from 'superagent'

export function setQueryFilter(idFilterSet) {
	return {
		type: 'SET_QUERY_FILTER',
		idFilterSet
	}
}

export function clearQueryFilter() {
	return {
		type: 'CLEAR_QUERY_FILTER'
	}
}

export function socketConnect(socketId) {
	return {
		type: 'SOCKET_CONNECT',
		socketId
	}
}

export function socketDisconnect() {
	return {
		type: 'SOCKET_DISCONNECT'
	}
}

export function requestEditing(id, data) {
	return {
		meta: { remote: true },
		type: 'REQUEST_EDITING',
		id,
		data
	}
}

export function releaseEditing(id) {
	return {
		meta: { remote: true },
		type: 'RELEASE_EDITING',
		id
	}
}

export function serverAddDoc(doc) {
	return {
		meta: { index: true },
		type: 'SERVER_ADD_DOC',
		doc
	}
}

export function serverDeleteDoc(doc) {
	return {
		type: 'SERVER_DELETE_DOC',
		doc
	}
}

export function serverUpdateDoc(doc) {
	return {
		meta: { index: true },
		type: 'SERVER_UPDATE_DOC',
		doc
	}
}

export function createDoc(doc) {

	return dispatch => {

		dispatch(createDocRequest(doc))

		return request
		.post('/api/0/doc/')
		.send(doc)
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (err) {
				dispatch(createDocFailure(err, doc))
			} else {
				dispatch(createDocSuccess(res.body))
			}
		})
	}
}

function createDocRequest(doc) {
	return {
		type: 'CREATE_DOC_REQUEST',
		doc
	}
}

function createDocSuccess(doc) {
	return {
		type: 'CREATE_DOC_SUCCESS',
		doc
	}
}

export function deleteDoc(doc) {

	return dispatch => {

		dispatch(deleteDocRequest(doc))

		return request
		.delete('/api/0/doc/' + doc.id)
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (err) {
				dispatch(deleteDocFailure(err, doc))
			} else {
				dispatch(deleteDocSuccess(res.body))
			}
		})
	}
}

function deleteDocRequest(doc) {
	return {
		type: 'DELETE_DOC_REQUEST',
		doc
	}
}

function deleteDocSuccess(doc) {
	return {
		type: 'DELETE_DOC_SUCCESS',
		doc
	}
}

function deleteDocFailure(error, doc) {
	return {
		type: 'DELETE_DOC_FAILURE',
		error,
		doc
	}
}

export function updateDoc(doc) {

	return dispatch => {

		dispatch(updateDocRequest(doc))

		return request
		.post('/api/0/doc/' + doc.id)
		.send(doc)
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (err) {
				dispatch(updateDocFailure(err, doc))
			} else {
				dispatch(updateDocSuccess(res.body))
			}
		})
	}
}

function updateDocRequest(doc) {
	return {
		type: 'UPDATE_DOC_REQUEST',
		doc
	}
}

function updateDocSuccess(doc) {
	return {
		type: 'UPDATE_DOC_SUCCESS',
		doc
	}
}

function updateDocFailure(error, doc) {
	return {
		type: 'UPDATE_DOC_FAILURE',
		error,
		doc
	}
}

export function loadDocsFromServer() {

	return dispatch => {

		dispatch(loadDocsRequest())

		return request
		.get('/api/0/doc')
		.send()
		.set('Accept', 'application/json')
		.end((err, res) => {
			if (err) {
				dispatch(loadDocsFailure(err))
			} else {
				dispatch(loadDocsSuccess(res.body))
				
			}
		})
	}
}

function loadDocsRequest() {
	return {
		type: 'LOAD_DOCS_REQUEST',
	}
}

function loadDocsSuccess(docs) {
	return {
		meta: { index: true },
		type: 'LOAD_DOCS_SUCCESS',
		documents: List(docs)
	}
}

function loadDocsFailure(error) {
	return {
		type: 'LOAD_DOCS_FAILURE',
		error
	}
}


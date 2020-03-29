import url from 'url'
import http, {IncomingMessage, ServerResponse} from 'http'

import {input} from './app/input'
import WordCounter from './app/domain/word-counter'

const port = 8000

const server = http.createServer(handlerRequest)
server.listen(port)
server.on('error', (e: Error) => console.error('*** Server error', e))
server.on('listening', () => console.log('*** Server running at http://localhost:%s/', port))

function handlerRequest (request: IncomingMessage, response: ServerResponse) {
	const wordCount = WordCounter(input, outputTo(response))
	wordCount(getLocationFrom(request)).catch(handleErr(response))
}

type OutputToServerResponse = (response: ServerResponse) => Output
const outputTo: OutputToServerResponse = response => async (wordCountJSON) => {
	response.writeHead(200, { 'Content-Type': 'application/json'})
			.end(JSON.stringify(wordCountJSON))
}

function getLocationFrom (request: IncomingMessage) {
	const reqURL = url.parse(request.url as string, true)
	return reqURL.query['location'] as string
}

type ErrorToServerResponse = (response: ServerResponse) => (error: Error) => void
const handleErr: ErrorToServerResponse = response => err => {
	response.writeHead(500)
			.end({cause: err.message})
}

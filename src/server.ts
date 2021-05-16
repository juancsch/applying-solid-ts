/* eslint-disable no-magic-numbers */

import url from 'url'
import http, { IncomingMessage, ServerResponse } from 'http'

import { input } from './app/input'
import { WordCounter, Output } from './app/domain/word-counter'

const port = 8000

const server = http.createServer(handlerRequest)
server.listen(port)
server.on('error', (e: Error) => console.error('*** Server error', e))
server.on('listening', () => console.log('*** Server running at http://localhost:%s/', port))

async function handlerRequest (request: IncomingMessage, response: ServerResponse) {

	try {
		const wordCount = WordCounter(input, outputTo(response))
		wordCount(getLocationFrom(request))
	} catch (err) {
		handleErrorTo(response, err)
	}
}

function outputTo (response: ServerResponse): Output {
	return async wordCountJSON => {
		response.writeHead(200, { 'Content-Type': 'application/json' })
				.end(JSON.stringify(wordCountJSON))
	}
}

function getLocationFrom (request: IncomingMessage) {
	const reqURL = url.parse(request.url as string, true)
	return reqURL.query.location as string
}

function handleErrorTo (response: ServerResponse, error: Error) {
	response.writeHead(500)
			.end({ cause: error.message })
}

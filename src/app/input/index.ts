import file from './input-from-file'
import http from './input-from-http'

const strategies = {
	file,
	http
}

export async function input (location: string) {

	if (location.includes('http')) {
		return strategies.http(location)
	}

	return strategies.file(location)
}

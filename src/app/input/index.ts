import file from './input-from-file'
import http from './input-from-http'

const strategies = {
	file,
	http
}

export const input: Input = (location) => {

	if (location.startsWith('http')) {
		return strategies['http'](location)
	}

	return strategies['file'](location)
}

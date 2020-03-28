import http from 'http'

export default function (url: string) {

	return new Promise<string>((resolve, reject) => {

		http.get(url, response => {
			let data = ''

			response.on('data', chunk => {
				data += chunk
			})

			response.on('end', () => {
				resolve(data)
			})
		}).on('error', (err) => {
			err.message = `[HTTPContent] Error retrieve data from ${url} due to ${err.message}`
			reject(err)
		})
	})
}

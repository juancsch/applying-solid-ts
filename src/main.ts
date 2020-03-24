import fs from 'fs'
import path from 'path'

main(process.argv[2])

async function main (filepath: string): Promise<void> {

	try {
		const filepathResolved = path.resolve(filepath)
		const data = await fs.promises.readFile(filepathResolved, 'utf8')

		const wordCount = data.split(/\s/).length
		const wordCountJSON = {
			wordCount
		}

		return fs.promises.writeFile(
			'word-count.json',
			JSON.stringify(wordCountJSON, null, 2)
		)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

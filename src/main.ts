import fs from 'fs'
import path from 'path'

main(process.argv[2])

async function main (filepath: string): Promise<void> {

	try {
		const data = await input(filepath)

		const wordCount = data.split(/\s/).length
		const wordCountJSON = {
			wordCount
		}

		await output(wordCountJSON)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

function input (filepath: string): Promise<string> {
	const filepathResolved = path.resolve(filepath)
	return fs.promises.readFile(filepathResolved, 'utf8')
}

type OutPut = (content: { wordCount: number }) => Promise<void>

function saveTo (filepath: string): OutPut {
	return content => {
		const filepathResolved = path.resolve(filepath)
		return fs.promises.writeFile(
			filepathResolved,
			JSON.stringify(content, null, 2)
		)
	}
}

const output: OutPut = saveTo('word-count.json')

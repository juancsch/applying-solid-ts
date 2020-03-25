import input from './input-from-file'
import { outputTo } from './output-from-file'
import WordCounter from './word-counter'

main(process.argv[2])

async function main (filepath: string): Promise<void> {
	try {
		const worCounter = WordCounter(input, outputTo('word-count.json'))
		await worCounter(filepath)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

import input from './app/input/input-from-file'
import { outputTo } from './app/output/output-from-file'
import WordCounter from './app/domain/word-counter'

const arg1 = process.argv[2]

main(arg1)

async function main (filepath: string): Promise<void> {
	try {
		const worCounter = WordCounter(input, outputTo('word-count.json'))
		await worCounter(filepath)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}
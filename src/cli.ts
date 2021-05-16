import { input } from './app/input'
import { outputTo } from './app/output/output-from-file'
import { WordCounter } from './app/domain/word-counter'

const arg1 = process.argv[2] // eslint-disable-line no-magic-numbers

main(arg1)

async function main (location: string) {
	try {
		const worCounter = WordCounter(input, outputTo('word-count.json'))
		await worCounter(location)
	} catch (e) {
		console.error(e)
		process.exit(1)
	}
}

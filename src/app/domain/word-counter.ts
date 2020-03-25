
export default (input: Input, output: Output) => async (location: string) => {
	const data = await input(location)

	const wordCount = data.split(/\s/).length
	const wordCountJSON = {
		wordCount
	}

	await output(wordCountJSON)
}

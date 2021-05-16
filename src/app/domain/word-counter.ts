
export interface Input {
	(location: string): Promise<string>
}

type ReportCounted = {
	wordCount: number
}

export interface Output {
	(content: ReportCounted): Promise<void>
}

export function WordCounter (input: Input, output: Output) {

	return async (location: string) => {

		const data = await input(location)

		const wordCount = data.split(/\s/).length
		const wordCountJSON = {
			wordCount
		}

		return output(wordCountJSON)
	}
}

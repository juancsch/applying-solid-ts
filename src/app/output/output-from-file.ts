import fs from 'fs'
import path from 'path'

export function outputTo (filepath: string) {

	return (content: { wordCount: number }) => {

		const filepathResolved = path.resolve(filepath)

		return fs.promises.writeFile(
			filepathResolved,
			JSON.stringify(content, null, 2) // eslint-disable-line no-magic-numbers
		)
	}
}

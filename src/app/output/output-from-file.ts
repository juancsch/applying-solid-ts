import fs from 'fs'
import path from 'path'

export function outputTo (filepath: string): Output {
	return content => {
		const filepathResolved = path.resolve(filepath)
		return fs.promises.writeFile(
			filepathResolved,
			JSON.stringify(content, null, 2)
		)
	}
}

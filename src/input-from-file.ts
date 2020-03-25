import fs from 'fs'
import path from 'path'

export default function (filepath: string): Promise<string> {
	const filepathResolved = path.resolve(filepath)
	return fs.promises.readFile(filepathResolved, 'utf8')
}

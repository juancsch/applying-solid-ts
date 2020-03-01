const path = require('path')
const fs = require('fs')

main(process.argv[2])

async function main (filepath) {

    try {
        const data = await fs.promises.readFile(path.resolve(filepath), 'utf8')

        const wordCount = data.split(/\s/).length
        const wordCountJSON = {
            wordCount
        }

        await fs.promises.writeFile(
            path.resolve('word-count.json'),
            JSON.stringify(wordCountJSON, null, 2)
        )
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

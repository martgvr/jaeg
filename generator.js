import { readFile, writeLine, clearFile } from './fileManage.js'

clearFile()

const config = {
    PORT: 3001,
    mode: 'cluster',
    layers: ['carts', 'products', 'users']
}


const fileContent = await readFile()

for (const line of fileContent) {
    const regex = /\[\[(.*?)\]\]/g
    const lineMatch = line.match(regex)

    if (lineMatch !== null) {
        let varsToReplace = []
        for (const variable of lineMatch) varsToReplace.push(variable.replace(regex, '$1'))

        let previousLine, newLine
        for (let i = 0; i < varsToReplace.length; i++) {
            if (i === 0) {
                previousLine = line
                for (const key in config) {
                    if (key === varsToReplace[i]) {
                        newLine = previousLine.replace('[[' + key + ']]', config[key])
                    }
                }
            } else {
                previousLine = newLine
                for (const key in config) {
                    if (key === varsToReplace[i]) {
                        newLine = previousLine.replace('[[' + key + ']]', config[key])
                    }
                }
            }
        }
        await writeLine(newLine)
    } else {
        await writeLine(line)
    }
}
import { readFile, writeLine, clearFile } from './fileManage.js'

clearFile()

const config = {
    PORT: 3001,
    mode: 'cluster',
    layers: ['carts', 'products', 'users'],
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
            previousLine = i === 0 ? line : newLine
            for (const key in config) {
                if (varsToReplace[i] === 'layers.import') {
                    newLine = previousLine.replace('[[layers.import]]', '// Realizar aqui el script para importación de capas')
                } else if (key === varsToReplace[i]) {
                        newLine = previousLine.replace('[[' + key + ']]', config[key])
                }
            }
        }
        await writeLine(newLine)
    } else {
        await writeLine(line)
    }
}
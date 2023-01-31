import { readFile, writeLine, clearFile } from './fileManage.js'

clearFile()

const config = {
    PORT: 8080,
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

                if (varsToReplace[i] === 'server.layers.import') {
                    let textToReplace = ''
                    for (const layer of config.layers) {
                        textToReplace += `import { ${layer}Routes } from './routes/${layer}.routes.js'\n`
                    }
                    newLine = previousLine.replace('[[server.layers.import]]', textToReplace)
                } 

                if (varsToReplace[i] === 'server.routes.generate') {
                    let textToReplace = ''
                    for (const layer of config.layers) {
                        textToReplace += `app.use('/${layer}', ${layer}Routes.init())\n`
                    }
                    newLine = previousLine.replace('[[server.routes.generate]]', textToReplace)
                } 

                if (key === varsToReplace[i]) {
                        newLine = previousLine.replace('[[' + key + ']]', config[key])
                }
            }

        }

        await writeLine(newLine)
    } else {
        await writeLine(line)
    }
}
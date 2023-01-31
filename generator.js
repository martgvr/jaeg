import { readFile, writeLine, clearFile } from './fileManage.js'

clearFile()

const config = {
    PORT: 3000,
    mode: 'cluster',
    layers: ['carts', 'products', 'users']
}




const fileContent = await readFile()

for (const line of fileContent) {
    const regex = /\[\[(.*?)\]\]/g
    const lineMatch = line.match(regex)

    if (lineMatch !== null) {
        // if (lineMatch.length > 1) {
        //     console.log('Hay más de una variable en la misma linea!', lineMatch.length)
        // }

        // Defino las variables a reemplazar en esa linea
        let varsToReplace = []

        for (const variable of lineMatch) {
            varsToReplace.push(variable.replace(regex, '$1'))
        }

        let newLine

        for (const variable of varsToReplace) {
            console.log('Variable a reemplazar:', variable)

            let previousLine = ''

            console.log('previousLine.length:', previousLine.length)

            if (previousLine.length > 0) {
                console.log('Había texto en la linea:', previousLine)
            }

            for (const key in config) {
                console.log('Si')

                if (Object.hasOwnProperty.call(config, key)) {
                    if (key === variable) {
                        newLine = line.replace('[[' + variable + ']]', config[variable])
                    }
                }
                previousLine = newLine
            }
        }

        console.log(newLine)


        // for (const element of lineMatch) {
        //     console.log(element)

        //     const variableToReplace = element.replace(regex, '$1');

        //     let newLine

        //     for (const key in config) {
        //         // console.log(key)
        //         if (Object.hasOwnProperty.call(config, key)) {
        //             if (key === variableToReplace) {
        //                 newLine = line.replace('[[' + variableToReplace + ']]', config[variableToReplace])
        //             }
        //         }
        //     }

        //     await writeLine(newLine)
        // }

    } else {
        await writeLine(line)
    }
}
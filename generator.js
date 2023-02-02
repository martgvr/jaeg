import { readFile, writeLine, clearFile } from './utils/fileManage.js'
import { syntaxGenerate } from './utils/syntaxGenerator.js'

clearFile()

const config = { PORT: 8080, mode: 'cluster', layers: ['carts', 'products', 'users'] }

const fileContent = await readFile()

// HACER FUNCIÓN QUE RECONOZCA TODOS LOS ARCHICOS Y CARPETAS DEL TEMPLATE
// Y LOS CREE CON LOS MISMOS NOMBRES PERO VACÍOS
// SACAR LAS EXTENSIONES .TEMPLATE.JS

// LA FUNCIÓN DEL GENERADOR VA A SER BUSCAR EL ARCHIVO EN BLANCO GENERADO
// Y REESCRIBIR EL CONTENIDO DEL TEMPLATE REEMPLAZANDO LAS VARIABLES

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
                if (varsToReplace[i] === 'server.layers.import') { newLine = previousLine.replace('[['+ varsToReplace[i] + ']]', syntaxGenerate(varsToReplace[i], config.layers)) } 
                if (varsToReplace[i] === 'server.routes.generate') { newLine = previousLine.replace('[['+ varsToReplace[i] + ']]', syntaxGenerate(varsToReplace[i], config.layers)) } 
                if (key === varsToReplace[i]) { newLine = previousLine.replace('[[' + key + ']]', config[key]) }
            }
        }
        
        await writeLine(newLine)
    } else {
        await writeLine(line)
    }
}
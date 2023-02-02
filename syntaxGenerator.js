export function syntaxGenerate(varToReplace, layers) {
    let textToReplace = ''
    let i = 0

    for (const layer of layers) {
        let pattern = ''
        if(varToReplace === 'server.layers.import') pattern += `import { ${layer}Routes } from './routes/${layer}.routes.js'`
        if(varToReplace === 'server.routes.generate') pattern += `app.use('/${layer}', ${layer}Routes.init())`
        textToReplace += (i === layers.length - 1) ? pattern :  pattern  + '\n'
        i++
    }
    
    return textToReplace
}
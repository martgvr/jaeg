import { mkdirp } from 'mkdirp'
import fs from 'fs'

// mkdirp('./tmp').then(made =>
//     console.log(`made directories, starting with ${made}`)
// )

// const template = (param) => {
//     return `import express from 'express'\n\nconst app = express()\n\nconst PORT = process.env.PORT || ${param}`
// }

// await fs.promises.writeFile('./server.js', template('8080'))

export async function clearFile() {
    try {
        await fs.promises.writeFile('./server.js', '');
    } catch (e) { console.log('Error! Algo salió mal') }
}

export async function readFile() {
    try {
        const data = await fs.promises.readFile('./templates/server.template.js', { encoding: 'utf8' });
        const splittedData = data.split('\n')
        return splittedData
    } catch (error) {
        return error
    }
}

export async function writeLine(line) {
    try {
        const fileRead = await fs.promises.readFile('./server.js', 'utf-8');
        await fs.promises.writeFile('./server.js', fileRead + (fileRead == '' ? line : '\n' + line));
    } catch (e) { console.log('Error! Algo salió mal') }
}

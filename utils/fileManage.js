import { mkdirp } from 'mkdirp'
import fs from 'fs'

await mkdirp('./generated')

export async function clearFile() {
    try {
        await fs.promises.writeFile('./generated/server.js', '');
    } catch (error) { console.log('Error! Algo salió mal', error) }
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
        const fileRead = await fs.promises.readFile('./generated/server.js', 'utf-8');
        await fs.promises.writeFile('./generated/server.js', fileRead + (fileRead == '' ? line : '\n' + line));
    } catch (error) { console.log('Error! Algo salió mal', error) }
}

import fs from 'fs'
import path from 'path'
import { mkdirp } from 'mkdirp'

await mkdirp('./generated')

export async function clearFile(filePath) {
    try {
        await fs.promises.writeFile(filePath, '');
    } catch (error) { console.log('Error! Algo salió mal', error) }
}

export async function readFile(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, { encoding: 'utf8' });
        const splittedData = data.split('\n')
        return splittedData
    } catch (error) {
        return error
    }
}

export async function writeLine(filePath, line) {
    try {
        const fileRead = await fs.promises.readFile(filePath, 'utf-8');
        await fs.promises.writeFile(filePath, fileRead + (fileRead == '' ? line : '\n' + line));
    } catch (error) { console.log('Error! Algo salió mal', error) }
}


export function getFiles(dir) {
    const isFile = (input) => fs.lstatSync(input).isFile()
    const files = fs.readdirSync(dir).map(fileName => path.join(dir, fileName)).filter(isFile)
    return files
}

export function getDirectories(dir) {
    const isDirectory = (input) => fs.lstatSync(input).isDirectory()
    const directories = fs.readdirSync(dir).map(fileName => path.join(dir, fileName)).filter(isDirectory)
    return directories
}

export function getCompleteTree(dir) {
    let completeDirectory = getDirectories(dir)
    completeDirectory.push(dir.replace('./', ''))

    for (const directory of completeDirectory) {
        const directorieCheck = getDirectories(directory)
        directorieCheck.length !== 0 && directorieCheck.forEach(dir => completeDirectory.push(dir))
    }
    
    return completeDirectory
}
import fs from 'fs'
import path from 'path'

const rootPath = '../'

export function getFiles(rootPath) {
    const isFile = (input) => { return fs.lstatSync(input).isFile() }
    const files = fs.readdirSync(rootPath).map(fileName => { return path.join(rootPath, fileName) }).filter(isFile)
    return files
}

export function getDirectories(rootPath) {
    const isDirectory = (input) => { return fs.lstatSync(input).isDirectory() }
    const directories = fs.readdirSync(rootPath).map(fileName => { return path.join(rootPath, fileName) }).filter(isDirectory)
    return directories
}

console.log(getFiles(rootPath))
console.log(getDirectories(rootPath))

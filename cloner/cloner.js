import fs from 'fs'
import path from 'path'

function getFiles(dir) {
    const isFile = (input) => { return fs.lstatSync(input).isFile() }
    const files = fs.readdirSync(dir).map(fileName => path.join(dir, fileName)).filter(isFile)
    return files
}

function getDirectories(dir) {
    const isDirectory = (input) => { return fs.lstatSync(input).isDirectory() }
    const directories = fs.readdirSync(dir).map(fileName => path.join(dir, fileName)).filter(isDirectory)
    return directories
}

function getCompleteTree(dir) {
    let completeDirectory = getDirectories(rootPath)
    for (const directory of completeDirectory) {
        const directorieCheck = getDirectories(directory)
        directorieCheck.length !== 0 && directorieCheck.forEach(dir => completeDirectory.push(dir))
    }
    return completeDirectory
}

const rootPath = './templates'
const completeTree = getCompleteTree(rootPath)

console.log(getFiles(completeTree[0]))
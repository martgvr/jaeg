import fs from 'fs'
import path from 'path'
import { mkdirp } from 'mkdirp'

function getFiles(dir) {
    const isFile = (input) => fs.lstatSync(input).isFile()
    const files = fs.readdirSync(dir).map(fileName => path.join(dir, fileName)).filter(isFile)
    return files
}

function getDirectories(dir) {
    const isDirectory = (input) => fs.lstatSync(input).isDirectory()
    const directories = fs.readdirSync(dir).map(fileName => path.join(dir, fileName)).filter(isDirectory)
    return directories
}

const rootPath = './templates'

function getCompleteTree(dir) {
    let completeDirectory = getDirectories(rootPath)
    for (const directory of completeDirectory) {
        const directorieCheck = getDirectories(directory)
        directorieCheck.length !== 0 && directorieCheck.forEach(dir => completeDirectory.push(dir))
    }
    return completeDirectory
}

export function createCompleteTree() {
    const creationPath = './generated'
    const completeTree = getCompleteTree(rootPath)

    if (!fs.existsSync(creationPath)) mkdirp(creationPath)

    for (const directory of completeTree) {
        mkdirp(creationPath + '/' + directory)
    }
}

createCompleteTree()
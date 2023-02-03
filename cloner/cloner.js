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

function getCompleteTree(dir) {
    let completeDirectory = getDirectories(dir)
    completeDirectory.push('templates')

    for (const directory of completeDirectory) {
        const directorieCheck = getDirectories(directory)
        directorieCheck.length !== 0 && directorieCheck.forEach(dir => completeDirectory.push(dir))
    }
    return completeDirectory
}

const templatePath = './templates'
const creationPath = './generated'

export async function createCompleteTree() {
    let completeTree = getCompleteTree(templatePath)

    if (!fs.existsSync(creationPath)) await mkdirp(creationPath)
    
    for (const directory of completeTree) {
        const directoryToCreate = creationPath + directory.replace('templates', '')

        if (directory !== 'templates') {
            await mkdirp(directoryToCreate)
        }
        
        const checkFiles = getFiles(directory)

        if (checkFiles.length !== 0) {
            for (const file of checkFiles) {
                // ACA ENTRA LA FUNCIÓN DE REEMPLAZO DE VARIABLES Y ESCRITURA
                fs.writeFileSync(directoryToCreate + '/' + path.basename(file), '');
            }
        }
    }
}

createCompleteTree()
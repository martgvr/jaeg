import fs from 'fs'
import path from 'path'

const rootPath = '../templates'

function getFiles(rootPath) {
    const isFile = (input) => { return fs.lstatSync(input).isFile() }
    const files = fs.readdirSync(rootPath).map(fileName => { return path.join(rootPath, fileName) }).filter(isFile)
    return files
}

function getDirectories(rootPath) {
    const isDirectory = (input) => { return fs.lstatSync(input).isDirectory() }
    const directories = fs.readdirSync(rootPath).map(fileName => { return path.join(rootPath, fileName) }).filter(isDirectory)
    return directories
}

const files = getFiles(rootPath)
const directories = getDirectories(rootPath)

export function cloneTemplate() {
    if (!fs.existsSync('../generated')) {
        fs.mkdir('../generated', (error) => error && console.log('Error al crear directorio base', error))
    }

    for (const file of files) {
        try {
            fs.writeFileSync('../generated/' + path.basename(file), '');
          } catch (err) {
            console.error(err);
          }
    }
}

cloneTemplate()



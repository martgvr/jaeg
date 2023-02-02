import fs from 'fs'
import path from 'path'
import { mkdirp } from 'mkdirp'

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

export function cloneTemplate() {
    const files = getFiles(rootPath)
    const directories = getDirectories(rootPath)

    if (!fs.existsSync('../generated')) {
        fs.mkdir('../generated', (e) => e && console.log(e))
    }

    for (const directory of directories) {
        try {
            mkdirp('../generated/' + path.basename(directory))
          } catch (err) {
            console.error(err);
          }
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



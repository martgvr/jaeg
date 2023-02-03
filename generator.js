import fs from 'fs'
import path from 'path'
import { mkdirp } from 'mkdirp'

import { getFiles, getCompleteTree } from './utils/fileSystem.js'

const config = { 
    PORT: 8080, 
    mode: 'cluster', 
    layers: ['carts', 'products', 'users'] 
}

const templatePath = './templates'
const creationPath = './generated'

async function createCompleteTree() {
    let completeTree = getCompleteTree(templatePath)
    if (!fs.existsSync(creationPath)) await mkdirp(creationPath)
    
    for (const directory of completeTree) {
        const directoryToCreate = creationPath + directory.replace(templatePath.replace('./', ''), '')
        directory !== 'templates' && await mkdirp(directoryToCreate)
        
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
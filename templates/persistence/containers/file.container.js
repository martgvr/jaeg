import fs from 'fs'

export default class FileContainer {
    constructor(path) {
        this.path = path
    }

    async getAll() {
        try {            
            const data = await this.#readFile()
            return data
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }
    
    #readFile = async () => {
        if (fs.existsSync(this.path)) {
            const usersFile = await fs.promises.readFile(this.path, 'utf-8')
            return JSON.parse(usersFile)
        } else {
            return []
        }
    }
}
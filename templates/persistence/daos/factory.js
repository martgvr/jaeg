import TemplateFileDAO from '../daos/file/template.dao.js'
import TemplateMongoDAO from '../daos/mongo/template.dao.js'

import * as dotenv from 'dotenv'
dotenv.config()
    
let templateDAO

class factorySwitcher {
    static instance
        
    constructor(DAO) {
        switch (DAO) {
            case 'file':
                templateDAO = new TemplateFileDAO('./fileDB/carts.json')
                break;
        
            default:
                templateDAO = new TemplateMongoDAO()
                break;
            }
    }
        
    getInstance() {
        if (!this.instance) {
            this.instance = new factorySwitcher()
        }
        return this.instance
    }
}

export const setDAO = new factorySwitcher(process.env.DAO === 'file' ? 'file' : '')

export { templateDAO }
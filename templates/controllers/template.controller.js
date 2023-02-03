import { templateDAO } from '../persistence/daos/factory.js'

export default class TemplateController {
    getTemplate = async (req,res) => res.send('Testing template')
}
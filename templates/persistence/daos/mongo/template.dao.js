import MongoContainer from '../../containers/mongo.container.js'
import { templateModel } from '../../models/template.model.js'

export default class TemplateMongoDAO extends MongoContainer {
    constructor() {
        super(templateModel)
    }
}
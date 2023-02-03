import express from 'express'
import TemplateController from '../controllers/template.controller.js'

const router = express.Router()

class TemplateRoutes {
    constructor() {
        this.TemplateController = new TemplateController()
    }
    
    init() {
        router.get('/', this.TemplateController.getTemplate)
        return router
    }
}

export const templateRoutes = new TemplateRoutes()
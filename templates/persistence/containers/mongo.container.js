export default class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const data = await this.model.find({})
            return data;
        } catch (error) {
            return { error: 'Something went wrong =/' }
        }
    }
}
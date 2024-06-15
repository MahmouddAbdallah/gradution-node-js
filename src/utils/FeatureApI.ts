import { Request } from 'express';

class FeatureApI {
    req: Request;
    model: any;
    constructor(req: Request, model: any) {
        this.req = req;
        this.model = model
    }
    filter() {
        const query = JSON.stringify(this.req.query);
        const query1 = JSON.parse(query.replace(/\b(gte|gt|lte|eq)\b/g, (_) => `$${_}`))
        const arrData = ['field', 'sort', 'limit', 'keyword', 'sort', 'select', 'page']
        arrData.forEach((element) => {
            delete query1[element];
        })
        this.model = this.model.find(query1)
        return this
    }
    sort() {
        let sort = this.req.query.sort || '-createdAt';
        sort = (sort as string).split(',').join(' ');
        if (sort) {
            this.model = this.model.sort(sort)
        }
        return this
    }
    populate(model: string, select: string) {
        this.model = this.model.populate(model, select)
        return this
    }
    field() {
        let fields = this.req.query.fields || '-createdAt';
        fields = (fields as string).split(',').join(' ');
        if (fields) {
            this.model = this.model.select(fields)
        }
        return this
    }
    select(items: string) {
        this.model = this.model.select(items)
        return this
    }
    limit() {
        const limit = this.req.query.limit;
        if (limit) {
            this.model = this.model.limit(limit)
        }
        return this
    }
}

export default FeatureApI
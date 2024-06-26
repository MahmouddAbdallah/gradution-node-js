import { Request } from 'express';

class FeatureApI {
    req: Request;
    model: any;
    constructor(req: Request, model: any) {
        this.req = req;
        this.model = model
    }
    find(filter: object) {
        this.model = this.model.find(filter)
        return this
    }
    findById(id: any) {
        this.model = this.model.findById(id)
        return this
    }
    filter() {
        const query = JSON.stringify(this.req.query);
        const query1 = JSON.parse(query.replace(/\b(gte|gt|lte|eq)\b/g, (_) => `$${_}`))
        const arrData = ['fields', 'sort', 'limit', 'keyword', 'sort', 'select', 'page']
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
    populate(model: string, select?: string) {
        if (select) {
            this.model = this.model.populate(model, select)
        } else {
            this.model = this.model.populate(model)
        }
        return this
    }
    field(select?: string) {
        let fields = this.req.query.fields;
        if (fields) {
            fields = (fields as string).split(',').join(' ');
        } else if (!fields && select) {
            fields = select
        }
        this.model = this.model.select(fields)
        return this
    }
    limit(limit?: number) {
        const limitqurey = this.req.query.limit || limit;
        if (limitqurey) {
            this.model = this.model.limit(limitqurey)
        }
        return this
    }
    skip() {
        const skip = this.req.query.skip;
        if (skip) {
            this.model = this.model.skip(skip)
        }
        return this
    }
    search() {
        const keyword = this.req.query.keyword;
        if (keyword) {
            this.model = this.model.find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { name: { $regex: keyword, $options: 'i' } },
                ]
            })
        }
        return this
    }
    searchKeyword() {
        const keyword = this.req.query.keyword;
        if (keyword) {
            this.model = this.model.find({
                $or: [
                    { keyword: { $regex: keyword, $options: 'i' } }
                ]
            })
        }
        return this
    }
    searchProduct() {
        const keyword = this.req.query.keyword;
        if (keyword) {
            this.model = this.model.find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                    { warning: { $regex: keyword, $options: 'i' } },
                    { ingredient: { $regex: keyword, $options: 'i' } },
                ]
            })
        }
        return this
    }
}

export default FeatureApI
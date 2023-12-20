/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    GetListParams,
    GetListResult,
    RaRecord,
    GetOneParams,
    GetOneResult,
    GetManyParams,
    GetManyResult,
    GetManyReferenceParams,
    GetManyReferenceResult,
    UpdateParams,
    UpdateResult,
    UpdateManyParams,
    UpdateManyResult,
    CreateParams,
    CreateResult,
    DeleteParams,
    DeleteResult,
    DeleteManyParams,
    DeleteManyResult,
} from 'ra-core'
import Datastore from '@seald-io/nedb'
import { DataProviderBase, ResourceBase } from './DataProviderBase'

class NedbResource extends ResourceBase {
    constructor(name: string, public dataStore: Datastore<any> = new Datastore<any>({ compareStrings: (a, b) => {
        const collator = new Intl.Collator([], {numeric: true});
        return collator.compare(a, b)
    }, })) {
        super(name)
    }
}

export class NedbDataProvider extends DataProviderBase {
    constructor(public resourceNames?: string[], public searchFields?: { [key: string]: string }) {
        super()
        if (resourceNames) {
            for (const name of resourceNames) this.resources[name] = new NedbResource(name)
        }
    }
    async getList<RecordType extends RaRecord = any>(resource: string, params: GetListParams): Promise<GetListResult<RecordType>> {
        return await this._getList(resource, params)
    }
    async getOne<RecordType extends RaRecord = any>(resource: string, params: GetOneParams): Promise<GetOneResult<RecordType>> {
        return await this._getOne(resource, params)
    }

    async getMany<RecordType extends RaRecord = any>(resource: string, params: GetManyParams): Promise<GetManyResult<RecordType>> {
        return await this._getMany(resource, params)
    }

    async getManyReference<RecordType extends RaRecord = any>(resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult<RecordType>> {
        return await this._getManyReference(resource, params)
    }

    async update<RecordType extends RaRecord = any>(resource: string, params: UpdateParams): Promise<UpdateResult<RecordType>> {
        return await this._update(resource, params)
    }

    async updateMany(resource: string, params: UpdateManyParams): Promise<UpdateManyResult> {
        return await this._updateMany(resource, params)
    }

    async create<RecordType extends RaRecord = any>(resource: string, params: CreateParams): Promise<CreateResult<RecordType>> {
        return await this._create(resource, params)
    }

    async delete<RecordType extends RaRecord = any>(resource: string, params: DeleteParams): Promise<DeleteResult<RecordType>> {
        return await this._delete(resource, params)
    }

    async deleteMany(resource: string, params: DeleteManyParams): Promise<DeleteManyResult> {
        return await this._deleteMany(resource, params)
    }

    async _getOne<RecordType extends RaRecord = any>(resource: string, params: GetOneParams): Promise<GetOneResult<RecordType>> {
        let result: GetOneResult<RecordType>
        const r = this.resources[resource]
        if (r instanceof NedbResource) {
            const data = await r.dataStore.findOneAsync<RecordType>({
                _id: params.id,
            })
            result = { data }
        } else throw new Error('Invalid resource')
        this.convertToIds(result)
        return result
    }

    async _getMany<RecordType extends RaRecord = any>(resource: string, params: GetManyParams): Promise<GetManyResult<RecordType>> {
        let result: GetManyResult<RecordType>
        const r = this.resources[resource]
        if (r instanceof NedbResource) {
            const data = await r.dataStore.findAsync({
                _id: { '$in': params.ids },
            })
            result = { data }
        } else throw new Error('Invalid resource')
        this.convertToIds(result)
        return result
    }

    async _getManyReference<RecordType extends RaRecord = any>(resource: string, params: GetManyReferenceParams): Promise<GetManyReferenceResult<RecordType>> {
        let result: GetManyReferenceResult<RecordType>
        const r = this.resources[resource]
        if (r instanceof NedbResource) {
            const data = await r.dataStore.findAsync({
                [params.target]: { "$in": [params.id] },
            })
            result = { data, total: data.length }
        } else throw new Error('Invalid resource')
        this.convertToIds(result)
        return result
    }

    async _create<RecordType extends RaRecord = any>(resource: string, params: CreateParams): Promise<CreateResult<RecordType>> {
        this.convertTo_Ids(params)
        let result: CreateResult<RecordType>
        const r = this.resources[resource]
        if (r instanceof NedbResource) {
            const data = await r.dataStore.insertAsync(params.data)
            result = { data: data as any } as any
        } else throw new Error('Invalid resource')
        this.convertToIds(result)
        return result
    }

    async _getList<RecordType extends RaRecord = any>(resource: string, params: GetListParams): Promise<GetListResult<RecordType>> {
        let result: GetListResult<RecordType>
        let { z, ...query } = params.filter as any
        let comp = ''
        if (z) {
            comp = z.split('.')[0]
            if (z.indexOf('.') >= 0) {
                z = '^' + z + '.*'
            } else z = undefined
            //query.component = comp
        }
        if (query?.q) {
            let q = query.q.replace(/&&/g, '&')
            q = q.replace(/\|\|/g, '&')
            const andStrings = (q.split('&') as string[]).map((s) => s.trim())
            const ands = andStrings.map((value) => ({
                and: value,
                ors: [] as string[],
                regexp: '',
            }))
            for (const and of ands) {
                and.ors = and.and.split('|').map((s) => s.trim())
                and.regexp = and.ors.reduce((acc, value) => {
                    acc = acc ? acc.concat(`|${value}`) : acc.concat(`${value}`)
                    return acc
                })
            }
            const expr = ands.reduce((acc, value) => acc.concat('(?=.*' + value.regexp + ')'), '')
            {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { q, ...skipQ } = query
                let queryField = 'name'
                if (this.searchFields && this.searchFields[resource]) queryField = this.searchFields[resource]
                query = { ...skipQ, [queryField]: new RegExp(expr, 'i') }
            }
        }
        if (z) {
            if (query) query.path = new RegExp(z, 'i')
            else query = { path: new RegExp(z, 'i') }
        }
        if (query.comment) {
            if (query) query.comment = new RegExp(query.comment, 'i')
            else query = { comment: new RegExp(query.comment, 'i') }
        }
        const r = this.resources[resource]
        if (r instanceof NedbResource) {
            const total = await r.dataStore.countAsync(query)
            let data: Document[] = []
            let cursor = r.dataStore.findAsync(query)
            if (params.pagination) cursor = cursor.skip((params.pagination.page ? params.pagination.page - 1 : params.pagination.page) * params.pagination.perPage).limit(params.pagination.perPage)
            if (params.sort)
                cursor = cursor.sort({
                    [params.sort.field]: params.sort?.order === 'ASC' ? 1 : -1,
                })
            data = await cursor
            result = { data: data as any, total }
            this.convertToIds(result)
        } else throw new Error('Invalid resource')
        return result
    }

    async _update<RecordType extends RaRecord = any>(resource: string, params: UpdateParams) {
        this.convertTo_Ids(params)
        let result: UpdateResult<RecordType>
        const r = this.resources[resource]
        if (r instanceof NedbResource) {
            await r.dataStore.updateAsync({ _id: params.id }, { $set: params.data })
            result = { data: params.data as any } as any
        } else throw new Error('Invalid resource')
        this.convertToIds(result)
        return result
    }

    async _updateMany<RecordType extends RaRecord = any>(resource: string, params: UpdateManyParams) {
        this.convertTo_Ids(params)
        let result: UpdateManyResult<RecordType>
        const r = this.resources[resource]
        if (r instanceof NedbResource) {
            await r.dataStore.updateAsync({ _id: params.ids }, { $set: params.data })
            result = { data: params.data as any } as any
        } else throw new Error('Invalid resource')
        this.convertToIds(result)
        return result
    }

    async _delete<RecordType extends RaRecord = any>(resource: string, params: DeleteParams): Promise<DeleteResult<RecordType>> {
        this.convertTo_Ids(params)
        let result: DeleteResult<RecordType>
        const r = this.resources[resource]
        if (r instanceof NedbResource) {
            const data = (await r.dataStore.findOneAsync({
                _id: params.id,
            })) as any
            if (data) {
                await r.dataStore.remove({ _id: params.id }, { multi: false })
            }
            result = { data }
            this.convertToIds(result)
        } else throw new Error('Invalid resource')
        return result
    }

    async _deleteMany(resource: string, params: DeleteManyParams): Promise<DeleteManyResult> {
        let result: DeleteManyResult
        const r = this.resources[resource]
        if (r instanceof NedbResource) {
            this.convertTo_Ids(params)
            const deleted = []
            for (const id of params.ids) {
                const count = await r.dataStore.removeAsync({ _id: id }, { multi: false })
                if (count) deleted.push({ id })
            }
            result = { data: deleted as any }
            this.convertToIds(result)
        } else throw new Error('Invalid resource')
        return result
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async readMany(paths: any[]): Promise<any> {}

    convertTo_Ids(params: any) {
        if (params?.id !== undefined)
            params._id = params.id
        if (params?.data && typeof params.data === 'object' && params.data.id !== undefined) {
            params.data._id = params.data.id
            delete params.data.id
        } else if (Array.isArray(params.data)) {
            for (const data of params.data) {
                if (data.id !== undefined) {
                    data._id = data.id
                    delete data.id
                }
            }
        }
    }
    convertToIds(result: any) {
        if (result?.data && Array.isArray(result.data)) {
            result.data.forEach(function (data: any) {
                if (data.id === undefined) {
                    data['id'] = data['_id']
                    delete data['_id']
                }
            })
        } else if (result?.data && typeof result.data === 'object') {
            const data: any = result.data
            if (!data.id !== undefined) {
                data['id'] = data['_id']
                delete data['_id']
            }
        }
    }
}

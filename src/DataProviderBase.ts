/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    DataProvider,
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
    DeleteManyResult
} from 'ra-core'

export class ResourceBase {
    constructor(public name: string) {
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type Document = {
    _id?: string
    createdAt?: Date
    updatedAt?: Date
}

export class DataProviderBase implements DataProvider {
    protected resources: { [index: string]: ResourceBase } = {}
    constructor(public resourceNames?: string[]) {
    }
    async getList<RecordType extends RaRecord = any>(
        resource: string,
        params: GetListParams
    ): Promise<GetListResult<RecordType>> { return undefined as unknown as GetListResult<RecordType> }

    async getOne<RecordType extends RaRecord = any>(
        resource: string,
        params: GetOneParams
    ): Promise<GetOneResult<RecordType>> { return undefined as unknown as GetOneResult<RecordType> }

    async getMany<RecordType extends RaRecord = any>(
        resource: string,
        params: GetManyParams
    ): Promise<GetManyResult<RecordType>> { return undefined as unknown as GetListResult<RecordType> }

    async getManyReference<RecordType extends RaRecord = any>(
        resource: string,
        params: GetManyReferenceParams
    ): Promise<GetManyReferenceResult<RecordType>> { return undefined as unknown as GetManyReferenceResult<RecordType> }

    async update<RecordType extends RaRecord = any>(
        resource: string,
        params: UpdateParams
    ): Promise<UpdateResult<RecordType>> { return undefined as unknown as UpdateResult<RecordType> }

    async updateMany(
        resource: string,
        params: UpdateManyParams
    ): Promise<UpdateManyResult> { return undefined as unknown as UpdateManyResult }

    async create<RecordType extends RaRecord = any>(
        resource: string,
        params: CreateParams
    ): Promise<CreateResult<RecordType>> { return undefined as unknown as CreateResult<RecordType> }

    async delete<RecordType extends RaRecord = any>(
        resource: string,
        params: DeleteParams
    ): Promise<DeleteResult<RecordType>> { return undefined as unknown as DeleteResult<RecordType> }

    async deleteMany(
        resource: string,
        params: DeleteManyParams
    ): Promise<DeleteManyResult> { return undefined as unknown as DeleteManyResult }
}

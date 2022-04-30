import {IBaseModel, IDBRecord} from "../types";


export abstract class BaseModel implements IBaseModel{
    static createSerializedFromDBRecord(dbRecord: IDBRecord): object {
        return {}
    }

    abstract id: number;
    abstract serialized: object;
}

export interface IBaseModelClass {
    BaseModel
}


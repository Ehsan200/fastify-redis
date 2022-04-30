import {IDBRecord, IUser} from "../types";
import {BaseModel} from "./base";

export class User extends BaseModel implements IUser {
    private _id?: number
    private _name: string
    private _lastName: string

    constructor(user: IUser) {
        super();
        this._id = user.id
        this._name = user.name
        this._lastName = user.lastName
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get lastName(): string {
        return this._lastName;
    }

    set lastName(value: string) {
        this._lastName = value;
    }

    get serialized(): IUser {
        return {
            id: this._id,
            name: this._name,
            lastName: this._lastName
        } as IUser
    }

    static createSerializedFromDBRecord(userRecord: IDBRecord): IUser {
        return {
            id: Number(userRecord.id),
            name: userRecord.name,
            lastName: userRecord.lastName
        } as IUser
    }
}

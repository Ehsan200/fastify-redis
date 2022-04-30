import Redis, {RedisKey} from "ioredis";
import {IRedisConfig} from "../types";
import {BaseModel, IBaseModelClass} from "../models/base";

export class DB {
    private static redis: Redis

    static initialize(config: IRedisConfig) {
        this.redis = new Redis(config)
    }

    static async loadObject(id: RedisKey, objectDbKey: string, BaseModelClass: IBaseModelClass): Promise<BaseModel> {
        const record = await this.redis.hgetall(`${objectDbKey}:${id}`)
        const serializedObject = BaseModelClass.BaseModel.createSerializedFromDBRecord(record)
        return new BaseModelClass.BaseModel(serializedObject)
    }

    static async createObject(object: BaseModel, objectDbKey: string, objectDbLengthKey: string): Promise<BaseModel> {
        const len = await this.redis.get(objectDbLengthKey)
        if (!len) {
            object.id = 0
        }

        object.id = Number(len)

        const items = []
        for (const item in object.serialized) {
            items.push(item, object.serialized[item])
        }
        this.redis.hset(`${objectDbKey}:${object.id}`, ...items)
        this.redis.incr(objectDbLengthKey)
        return object
    }
}

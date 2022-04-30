import {User} from "../models/user";
import {RedisKey} from "ioredis";
import {DB} from "./index";

export class UserDB {
    private static USER_DB_KEY = 'user'
    private static USER_LEN_DB_KEY = 'user_len'

    static async loadUser(id: RedisKey): Promise<User> {
        return await DB.loadObject(id, this.USER_DB_KEY, {BaseModel: User}) as User
    }

    static async createUser(user: User): Promise<User> {
        return await DB.createObject(user, this.USER_DB_KEY, this.USER_LEN_DB_KEY) as User
    }
}

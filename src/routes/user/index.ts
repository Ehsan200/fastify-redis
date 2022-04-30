import {FastifyInstance} from "fastify";
import {IUserType, UserSchema} from "../../schemas/user";
import {User} from "../../models/user";
import {IUser} from "../../types";
import {UserDB} from "../../database/user";

type IParams = { id: string }

export default function (fastify: FastifyInstance, opt, next) {
    fastify.get<{ Params: IParams }>('/:id/', async (request, reply) => {
        const userId = request.params.id
        const user = await UserDB.loadUser(userId)
        return user.serialized
    })

    // <{Body: IUserType, Reply: IUserType}> is optional
    fastify.post<{ Body: IUserType, Reply: IUserType }>('/', {
        schema: {
            body: UserSchema,
            response: {
                200: UserSchema,
            },
        },
    }, async (request, reply) => {
        const user = new User(request.body as IUser)
        const newUser = await UserDB.createUser(user)
        reply.status(201).send(newUser.serialized)
    })

    next();
}

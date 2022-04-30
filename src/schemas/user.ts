import { Static, Type } from '@sinclair/typebox'

// use in body and reply schema
const UserSchema = Type.Object({
    name: Type.String({maxLength: 150, minLength: 3}),
    lastName: Type.String({maxLength: 150, minLength: 3}),
});

// use for types in fastify.post or ...
type IUserType = Static<typeof UserSchema>;

export {
    IUserType,
    UserSchema
}

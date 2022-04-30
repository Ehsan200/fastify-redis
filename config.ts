import dotenv from 'dotenv';

dotenv.config()

export default {
    port: process.env.PORT,
    node_env: process.env.NODE_ENV,
    redis: {
        port: Number(process.env.REDIS_PORT),
        host: process.env.REDIS_HOST
    }
}

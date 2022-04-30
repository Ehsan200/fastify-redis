import fastify, {FastifyInstance} from "fastify";
import path from "path";
import AutoLoad from '@fastify/autoload';
import config from "./config";
import {DB} from "./src/database";


const app = fastify({logger: true})
DB.initialize(config.redis)

app.listen(config.port, '0.0.0.0', (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    // console.log(`we are listening on port ${config.port}`)
});


const registerPlugins = (app: FastifyInstance) => {
    app.register(AutoLoad, {
        dir: path.join(__dirname, 'src/routes'),
    })
}

registerPlugins(app);

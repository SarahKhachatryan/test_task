import express from 'express';
import { Logger } from './logger/api.logger';
import * as swaggerUi from 'swagger-ui-express';
import authMiddleware from './middleware/auth';
import handleError from './middleware/errorHandler';
import correlator from 'express-correlation-id';
import 'dotenv/config';
import Routes from './routes/user.routes';
import * as fs from 'fs';

class App {

    public express: express.Application;
    public logger: Logger;

    private swaggerFile: any = (process.cwd()+"/swagger/swagger.json");
    private swaggerData: any = fs.readFileSync(this.swaggerFile, 'utf8');
    private customCss: any = fs.readFileSync((process.cwd()+"/swagger/swagger.css"), 'utf8');
    private swaggerDocument = JSON.parse(this.swaggerData);

    constructor() {
        this.express = express();
        this.express.use('/api/docs', swaggerUi.serve,
        swaggerUi.setup(this.swaggerDocument, undefined, undefined, this.customCss));
        this.middleware();
        this.express.use('/api/users', new Routes().router);
        this.logger = new Logger();
        this.express.use(handleError);
    }

    private middleware(): void {
        this.express.use(express.json());
        this.express.use(correlator({ header: "x-my-correlation-header-name" }));
        this.express.use(authMiddleware.auth);
    }

}

export default new App().express;
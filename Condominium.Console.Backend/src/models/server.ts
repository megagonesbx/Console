import express, { Application} from "express";
import cors from "cors";
import Swagger from "swagger-ui-express";

import { Auth } from '../routes';

import { PORT } from '../config';
import { openApiConfig } from "../documentation";

export class Server {
    private app: Application;
    private port: string;

    private paths = {
        auth: "/api/auth",
        docs: "/api/docs"
    };

    constructor() {
        this.app = express();
        this.port = PORT;

        this.middlewares();
        this.routes();
    };

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
    };

    private routes() {
        this.app.use(this.paths.auth, Auth.default);
        this.app.use(this.paths.docs, Swagger.serve, Swagger.setup(openApiConfig));
    };

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listen on http://localhost:${this.port}`);
        });
    };
};
import express, { Application} from "express";
import cors from "cors";

import { Auth } from '../routes';

import { PORT } from '../config';

export class Server {
    private app: Application;
    private port: string;

    private paths = {
        auth: "/auth",
        docs: "/docs",
        user: "/user"
    };

    constructor() {
        this.app = express();
        this.port = PORT;

        this.middlewares();
        this.routes();
    };

    private middlewares() {
        // this.app.use("/api");
        this.app.use(cors());
        this.app.use(express.json());
    };

    private routes() {
        this.app.use(this.paths.auth, Auth.default);
    };

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listen on http://localhost:${this.port}`);
        });
    };
};
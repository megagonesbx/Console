import express, { Application} from "express";
import cors from "cors";
import Swagger from "swagger-ui-express";
import bodyParser from "body-parser";

import { Auth, Resident, User, Donation } from '../routes';

import { PORT } from '../config';
import { openApiConfig } from "../documentation";
import { GenericDataSource } from "../database/connection";
import { UserService, AuthService, ResidentService, DonationService } from '../services';

export class Server {
    private app: Application;
    private port: string;

    private paths = {
        auth: "/api/auth",
        docs: "/api/docs",
        user: "/api/user",
        resident: "/api/resident",
        donation: "/api/donation"
    };

    constructor() {
        this.app = express();
        this.port = PORT;

        this.middlewares();
        this.routes();
        this.dbConnection();
    };

    private async dbConnection() {
        try {
            const generic = new GenericDataSource.default();
            await generic.ping();

            this.app.locals.userService = await new UserService(generic.getClient());
            this.app.locals.authService = await new AuthService(generic.getClient());
            this.app.locals.residentService = await new ResidentService(generic.getClient());
            this.app.locals.donationService = await new DonationService(generic.getClient());

            console.log('DB CONNECTED')
        } catch (error) {
            console.log('[ERROR] [DBCONNECTION] ',error)
        }
    };

    private middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000  }));
    };

    private routes() {
        this.app.use(this.paths.auth, Auth.default);
        this.app.use(this.paths.user, User.default);
        this.app.use(this.paths.docs, Swagger.serve, Swagger.setup(openApiConfig));
        this.app.use(this.paths.resident, Resident.default);
        this.app.use(this.paths.donation, Donation.default)
    };

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`Listen on http://localhost:${this.port}`);
        });
    };
};
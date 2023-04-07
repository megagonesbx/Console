import express, { Application} from "express";
import cors from "cors";
import Swagger from "swagger-ui-express";

import { Auth, Resident, User, Donation } from '../routes';

import { PORT, SQL_MAX_SIZE_IMAGE, SQL_PARAMETER_LIMIT_IMAGE } from '../config';
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
        this.app.use(express.json({ limit: SQL_MAX_SIZE_IMAGE }));
        this.app.use(express.urlencoded({ limit: SQL_MAX_SIZE_IMAGE, extended: true, parameterLimit: SQL_PARAMETER_LIMIT_IMAGE }))
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
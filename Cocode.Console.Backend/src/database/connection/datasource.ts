import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";

import {
  SQL_CACHE,
  SQL_DATABASE,
  SQL_HOST,
  SQL_PASSWORD,
  SQl_PORT,
  SQL_USER,
} from "../../config";

import {
  HouseData,
  IncidentData,
  PaymentData,
  RoleData,
  UserData,
  SpreadsheetData,
  NotificationData,
} from "../entities";

class GenericDataSource {
  private datasource: DataSource;

  constructor() {
    const options: DataSourceOptions = {
      type: "mssql",
      host: SQL_HOST,
      port: +SQl_PORT,
      username: SQL_USER,
      password: SQL_PASSWORD,
      database: SQL_DATABASE,
      cache: SQL_CACHE || SQL_CACHE === "true" ? true : false,
      synchronize: false,
      entities: [
        UserData,
        HouseData,
        PaymentData,
        RoleData,
        IncidentData,
        SpreadsheetData,
        NotificationData,
      ],
      options: {
        useUTC: true,
      },
      extra: {
        validateConnection: false,
        trustServerCertificate: true,
      },
    };

    this.datasource = new DataSource(options);
  }

  public async ping() {
    try {
      await this.datasource.initialize();
      return "pong";
    } catch (error: any) {
      console.log("[Error] [SQL] Connection Error", error.message);
      return "";
    }
  }

  public getClient() {
    return this.datasource;
  }
}

export default GenericDataSource;

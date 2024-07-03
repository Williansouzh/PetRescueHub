import "./util/module-alias";
import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
export class App {
  readonly port: number;
  readonly app: Application;
  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT as string);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
  public getApp(): Application {
    return this.app;
  }
  public async init(): Promise<void> {
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.setupExpress();
    this.setupRoutes();
  }
  public setupExpress(): void {}
  public setupRoutes(): void {
    //this.app.use(route);
  }
  private async databaseSetup(): Promise<void> {
    //await database.connect();
  }
  public async close(): Promise<void> {
    //await database.close();
  }
}

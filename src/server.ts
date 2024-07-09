import express, { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as database from "./database/connection";
import route from "./routes/userRoute";
import { errorMiddleware } from "./middleware/errorHandler";
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
    this.setupExpress();
    await this.databaseSetup();
  }
  public setupExpress(): void {
    this.app.use(bodyParser.json());
    this.app.use(express.json());
    this.setupRoutes();
    this.app.use(errorMiddleware);
  }
  public start(): void {
    this.app.listen(this.port, () => {
      console.info("Server listening on port: " + this.port);
    });
  }
  public setupRoutes(): void {
    this.app.use(route);
  }
  private async databaseSetup(): Promise<void> {
    await database.connect();
  }
  public async close(): Promise<void> {
    await database.close();
  }
}

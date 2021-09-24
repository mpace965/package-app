import { Next, Request, Response } from "restify";
import { LicenseDataProvider } from "../dataProvider/LicenseDataProvider";
import { VulnerabilityDataProvider } from "../dataProvider/VulnerabilityDataProvider";
import { RouteHandler } from "./RouteHandler";

export class GetHealth implements RouteHandler {
  constructor(
    private licenseRepository: LicenseDataProvider,
    private vulnerabilityDataProvider: VulnerabilityDataProvider
  ) {}

  public async handle(req: Request, res: Response, next: Next): Promise<void> {
    console.log(req, res, next);
    res.send(200);
  }
}

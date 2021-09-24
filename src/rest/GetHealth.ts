import { Next, Request, Response } from "restify";
import { InternalServerError, NotFoundError } from "restify-errors";
import { DataProviderInternalError } from "../dataProvider/DataProviderInternalError";
import { LicenseDataProvider } from "../dataProvider/LicenseDataProvider";
import { VulnerabilityDataProvider } from "../dataProvider/VulnerabilityDataProvider";
import { Vulnerability } from "../entity/Vulnerability";
import { RouteHandler } from "./RouteHandler";

interface GetHealthParams {
  packageName: string;
  packageVersion: string;
}

export class GetHealth implements RouteHandler {
  constructor(
    private licenseRepository: LicenseDataProvider,
    private vulnerabilityDataProvider: VulnerabilityDataProvider
  ) {}

  public async handle(req: Request, res: Response, next: Next): Promise<void> {
    const { packageName, packageVersion } = req.params as GetHealthParams;

    let vulnerabilities: Array<Vulnerability> | undefined;
    let license: string | undefined;

    try {
      vulnerabilities = (
        await this.vulnerabilityDataProvider.read(packageName)
      ).filter((vuln) => vuln.packageVersion === packageVersion);
    } catch (e) {
      if (e instanceof DataProviderInternalError) {
        return next(new InternalServerError());
      }
    }

    try {
      license = (await this.licenseRepository.read(packageName)).license;
    } catch (e) {
      if (e instanceof DataProviderInternalError) {
        return next(new InternalServerError());
      }
    }

    if (!vulnerabilities && !license) {
      return next(new NotFoundError(`Package ${packageName} does not exist`));
    }

    res.send(200, {
      name: packageName,
      version: packageVersion,
      license: license || "unknown",
      vulnerabilities: vulnerabilities || [],
    });
    return next();
  }
}

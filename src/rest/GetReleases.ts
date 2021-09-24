import { Next, Request, Response } from "restify";
import { InternalServerError, NotFoundError } from "restify-errors";
import { DataProviderInternalError } from "../dataProvider/DataProviderInternalError";
import { ReleaseDataProvider } from "../dataProvider/ReleaseDataProvider";
import { RouteHandler } from "./RouteHandler";

interface GetReleasesParams {
  packageName: string;
}

export class GetReleases implements RouteHandler {
  constructor(private versionRepository: ReleaseDataProvider) {}

  public async handle(req: Request, res: Response, next: Next): Promise<void> {
    const { packageName } = req.params as GetReleasesParams;

    let versions: Array<string> | undefined;

    try {
      versions = await this.versionRepository.read(packageName);
    } catch (e) {
      if (e instanceof DataProviderInternalError) {
        return next(new InternalServerError());
      }
    }

    if (!versions) return next(new NotFoundError());

    const latest =
      versions.length > 0 ? versions[versions.length - 1] : "unknown";

    res.send(200, {
      name: packageName,
      latest,
      releases: versions,
    });
    return next();
  }
}

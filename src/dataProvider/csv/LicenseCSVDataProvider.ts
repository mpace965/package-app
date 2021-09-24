import { createReadStream } from "fs";
import csv from "csv-parser";
import { DataProviderNotFoundError } from "../DataProviderNotFoundError";
import { DataProviderInternalError } from "../DataProviderInternalError";
import { License } from "../../entity/License";

export class LicenseCSVDataProvider {
  private packageCache: Record<string, string> = {};
  private cached: boolean = false;

  constructor(private path: string) {}

  public async read(packageName: string): Promise<License> {
    await this.loadIfNotCached();

    const license = this.packageCache[packageName];

    if (license) {
      return { packageName, license };
    }

    throw new DataProviderNotFoundError();
  }

  private async loadIfNotCached(): Promise<void> {
    if (!this.cached) {
      await this.loadData();
      this.cached = true;
    }
  }

  private async loadData(): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        createReadStream(this.path)
          .pipe(csv(["packageName", "license"]))
          .on("data", ({ packageName, license }: License) => {
            this.packageCache[packageName] = license;
          })
          .on("end", resolve)
          .on("error", reject);
      });
    } catch (e) {
      console.error(e);
      throw new DataProviderInternalError();
    }
  }
}

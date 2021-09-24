import { createReadStream } from "fs";
import csv from "csv-parser";
import { NotFoundError } from "../NotFoundError";
import { DataProviderInternalError } from "../DataProviderInternalError";

export interface License {
  packageName: string;
  license: string;
}

export class LicenseCSVDataProvider {
  private packageCache: Record<string, string> = {};
  private cached: boolean = false;

  public async read(packageName: string): Promise<License> {
    await this.loadIfNotCached();

    const license = this.packageCache[packageName];

    if (license) {
      return { packageName, license };
    }

    throw new NotFoundError();
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
        createReadStream("./data/licenses.csv")
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

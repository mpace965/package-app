import { promisify } from "util";
import { readFile as readFileCallback } from "fs";
import { NotFoundError } from "../NotFoundError";
import { DataProviderInternalError } from "../DataProviderInternalError";

const readFile = promisify(readFileCallback);

export class LicenseCSVDataProvider {
  private packageCache: Record<string, string> = {};
  private cached: boolean = false;

  public async read(packageName: string): Promise<string> {
    await this.loadIfNotCached();

    const license = this.packageCache[packageName];

    if (license) {
      return license;
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
      const file = await readFile("./data/licenses.csv");
      const lines = file.toString().split("\n");
      for (const line of lines) {
        const [packageName, license] = line.split(",");
        this.packageCache[packageName] = license;
      }
    } catch (e) {
      console.error(e);
      throw new DataProviderInternalError();
    }
  }
}

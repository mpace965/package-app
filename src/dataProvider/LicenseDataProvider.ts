import { License } from "../entity/License";

export interface LicenseDataProvider {
  read(packageName: string): Promise<License>;
}

import { LicenseCSVDataProvider } from "../../../dataProvider/csv/LicenseCSVDataProvider";
import { VulnerabilityCSVDataProvider } from "../../../dataProvider/csv/VulnerabilityCSVDataProvider";

export const licenseDataProvider = new LicenseCSVDataProvider(
  "./data/licenses.csv"
);
export const vulnerabilityDataProvider = new VulnerabilityCSVDataProvider(
  "./data/vulnerabilities.csv"
);

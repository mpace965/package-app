import { GetHealth } from "../../rest/GetHealth";
import {
  licenseDataProvider,
  vulnerabilityDataProvider,
} from "../dataProvider/csv";

export const getHealth = new GetHealth(
  licenseDataProvider,
  vulnerabilityDataProvider
);

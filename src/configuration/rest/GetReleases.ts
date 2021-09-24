import { GetReleases } from "../../rest/GetReleases";
import { npmDataProvider } from "../dataProvider/api";

export const getReleases = new GetReleases(npmDataProvider);

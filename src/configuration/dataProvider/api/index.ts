import { NpmApiDataProvider } from "../../../dataProvider/api/NpmApiDataProvider";

export const npmDataProvider = new NpmApiDataProvider(
  "https://registry.npmjs.org/"
);

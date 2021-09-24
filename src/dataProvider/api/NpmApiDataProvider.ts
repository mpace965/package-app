import axios, { AxiosInstance } from "axios";
import { ReleaseDataProvider } from "../ReleaseDataProvider";

interface VersionResponse {
  versions: Record<string, object>;
}

export class NpmApiDataProvider implements ReleaseDataProvider {
  protected client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({ baseURL });
  }

  async read(packageName: string): Promise<Array<string>> {
    const result = await this.client.get<VersionResponse>(`/${packageName}`);

    return Object.keys(result.data.versions);
  }
}

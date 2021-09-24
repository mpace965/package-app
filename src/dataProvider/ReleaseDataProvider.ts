export interface ReleaseDataProvider {
  read(packageName: string): Promise<Array<string>>;
}

export interface IAppConfig {
  [key: string]: any;
  locale?: string;
  api: { base: string; };
}

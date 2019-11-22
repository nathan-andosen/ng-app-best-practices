import { IAppConfig } from './app-config.interface';

export class DynamicEnvironment {
  get config(): IAppConfig {
    return window.AppConfig;
  }
}

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { DynamicEnvironment } from './dynamic-environment';
class Environment extends DynamicEnvironment {
  production: boolean;
  constructor() {
    super();
    this.production = false;
  }
}
export const environment = new Environment();

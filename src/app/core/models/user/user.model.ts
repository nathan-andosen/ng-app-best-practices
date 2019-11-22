import { UserAddressModel } from './user-address.model';
import { UserSettingsModel } from './user-settings.model';

export class UserModel {
  address = new UserAddressModel();
  settings = new UserSettingsModel();
}

import { ObservableStore } from '@core/models/observable-store.model';
import { IUserData } from './user.interfaces';


export class UserAddressModel {
  // private store: ObservableStore<IUserData>;

  constructor(private store: ObservableStore<IUserData>) {}

  updateStreet(street: string, action?: string) {
    this.store.patchState({ address: { street }}, action);
  }
}

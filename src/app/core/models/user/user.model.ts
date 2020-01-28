import { UserAddressModel } from './user-address.model';
import { UserSettingsModel } from './user-settings.model';
import { ObservableStore } from '@core/models/observable-store.model';
import { IUserData } from './user.interfaces';
import { EventManager } from '@thenja/event-manager';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '@core/services';


export const USER_EVENTS = {
  DATA_CHANGED: 'data-changed',
  NAME_UPDATED: 'name-updated',
  DESTROYED: 'destroyed'
};


/**
 * Example user model that has events and a RxJs observable store
 *
 * @export
 * @class UserModel
 */
export class UserModel {
  events: EventManager;
  store: ObservableStore<IUserData>;
  private storeChangedSubscription: Subscription;
  address: UserAddressModel;
  settings: UserSettingsModel;

  get state$(): Observable<IUserData> {
    return this.store.state$;
  }

  get state(): IUserData {
    return this.store.state;
  }

  /**
   * Creates an instance of UserModel.
   *
   * @param {IUserData} [userData]
   * @memberof UserModel
   */
  constructor(private authSrv: AuthService, userData?: IUserData) {
    this.events = new EventManager(USER_EVENTS);
    userData = userData || { name: '' };
    this.store = new ObservableStore(userData);
    this.settings = new UserSettingsModel();
    this.address = new UserAddressModel(this.store);

    this.storeChangedSubscription = this.store.state$.subscribe((data) => {
      this.events.emit(USER_EVENTS.DATA_CHANGED, data);
    });
  }


  /**
   * Destroy the model. Unsubscribe from events.
   *
   * @memberof UserModel
   */
  destroy() {
    this.events.emit(USER_EVENTS.DESTROYED);
    this.events.offAll();
    this.storeChangedSubscription.unsubscribe();
  }


  /**
   * Update the users name
   *
   * @param {string} name
   * @param {string} [action]
   * @memberof UserModel
   */
  updateName(name: string, action?: string) {
    this.store.patchState({ name }, action);
    this.events.emit(USER_EVENTS.NAME_UPDATED, name);
  }
}

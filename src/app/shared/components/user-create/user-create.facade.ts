import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { UserCreateModule } from './user-create.module';
import {
  UserCreateService,
  USER_CREATE_SRV_EVENTS
} from './services/user-create.service';
import { UserModel } from '@core/models/user';
import { EventManager, EventListener } from '@thenja/event-manager';

export const USER_CREATE_EVENTS = {
  CREATED: 'user-create-created'
};


/**
 * User create facade. Any outside code / components that need functionality
 * from the user-create component should always be done through the facade.
 *
 * Facade is a good practice to simplify the api and only expose the methods
 * you want to the outside world.
 *
 * @export
 * @class UserCreateFacade
 */
@Injectable({
  providedIn: UserCreateModule
})
export class UserCreateFacade implements OnDestroy {
  events: EventManager;


  /**
   * Creates an instance of UserCreateFacade.
   *
   * @param {UserCreateService} userCreateSrv
   * @memberof UserCreateFacade
   */
  constructor(private userCreateSrv: UserCreateService) {
    this.events = new EventManager(USER_CREATE_EVENTS);
    this.init();
  }

  init() {}
  ngOnDestroy() {}


  /**
   * Get the current user that was created.
   *
   * @returns {UserModel}
   * @memberof UserCreateFacade
   */
  getCurrentUser(): UserModel {
    return this.userCreateSrv.getCurrentUser();
  }


  /**
   * Listen to the user created event on the UserCreateService
   *
   * @param {UserModel} user
   * @memberof UserCreateFacade
   */
  @EventListener({
    eventName: USER_CREATE_SRV_EVENTS.CREATED,
    eventClass: UserCreateService.name,
    initFn: 'init',
    destroyFn: 'ngOnDestroy'
  })
  userCreated(user: UserModel) {
    this.events.emit(USER_CREATE_EVENTS.CREATED, user);
  }
}

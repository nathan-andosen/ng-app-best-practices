import { Injectable } from '@angular/core';
import { UserModel, UserFactory } from '@core/models/user';
import { EventManager } from '@thenja/event-manager';
import { AuthService } from '@core/services';

export const USER_CREATE_SRV_EVENTS = {
  CREATED: 'user-create-srv-created',
  DESTROYED: 'user-create-srv-destroyed'
};


@Injectable()
export class UserCreateService {
  private currentUser: UserModel;
  events: EventManager;

  /**
   * Creates an instance of UserCreateService.
   *
   * @param {UserFactory} userFactory
   * @memberof UserCreateService
   */
  constructor(private userFactory: UserFactory,
  private authSrv: AuthService) {
    this.events = new EventManager(USER_CREATE_SRV_EVENTS);
  }


  /**
   * Simple method to demonstrate how you should inject outside services into
   * this service and only ever use the UserCreateService with the user-create
   * component
   *
   * @returns {boolean}
   * @memberof UserCreateService
   */
  userIsLoggedIn(): boolean {
    return this.authSrv.isLoggedIn();
  }


  /**
   * Create a user
   *
   * @returns {UserModel}
   * @memberof UserCreateService
   */
  createUser(): UserModel {
    this.currentUser = this.userFactory.create({
      name: 'Clark Kent',
      address: {
        street: '2 Old McDonald farm road'
      },
      pets: [
        { type: 'dog', name: 'Max' },
        { type: 'fish', name: 'Phil' }
      ]
    });
    this.events.emit(USER_CREATE_SRV_EVENTS.CREATED, this.currentUser);
    return this.currentUser;
  }


  /**
   * Destroy a user
   *
   * @memberof UserCreateService
   */
  destroyUser() {
    this.currentUser = null;
    this.events.emit(USER_CREATE_SRV_EVENTS.DESTROYED);
  }


  /**
   * Get current user
   *
   * @returns {UserModel}
   * @memberof UserCreateService
   */
  getCurrentUser(): UserModel {
    return this.currentUser;
  }
}

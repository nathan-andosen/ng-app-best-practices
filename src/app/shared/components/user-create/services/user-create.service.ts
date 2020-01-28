import { Injectable } from '@angular/core';
import { UserModel, USER_EVENTS, UserFactory } from '@core/models/user';
import { EventManager } from '@thenja/event-manager';

export const USER_CREATE_EVENTS = {
  CREATED: 'user-create-created'
};


@Injectable()
export class UserCreateService {
  private currentUser: UserModel;
  events: EventManager;

  constructor(private userFactory: UserFactory) {
    this.events = new EventManager(USER_CREATE_EVENTS);
  }

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
    this.events.emit(USER_CREATE_EVENTS.CREATED, this.currentUser);
    return this.currentUser;
  }


  getCurrentUser(): UserModel {
    return this.currentUser;
  }
}

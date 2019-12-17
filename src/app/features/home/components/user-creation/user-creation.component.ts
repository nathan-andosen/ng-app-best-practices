import { Component, OnDestroy } from '@angular/core';
import { UserModel, USER_EVENTS, UserFactory } from '@core/models/user';


@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.scss']
})
export class UserCreationComponent implements OnDestroy {
  user: UserModel;

  constructor(private userFactory: UserFactory) {}


  ngOnDestroy() {
    if (this.user) this.user.destroy();
  }


  createUser() {
    if (this.user) this.user.destroy();
    this.user = this.userFactory.create({
      name: 'Clark Kent',
      address: {
        street: '2 Old McDonald farm road'
      },
      pets: [
        { type: 'dog', name: 'Max' },
        { type: 'fish', name: 'Phil' }
      ]
    });
    this.user.address.updateStreet('1 Old McDonald farm road',
      '[UserCreationComponent] updateStreet');

    this.user.events.on(USER_EVENTS.DATA_CHANGED, (data) => {
      console.log('USER_EVENTS.DATA_CHANGED', data);
    });

    this.user.events.on(USER_EVENTS.DESTROYED, () => {
      console.log('USER_EVENTS.DESTROYED');
    });
  }

}


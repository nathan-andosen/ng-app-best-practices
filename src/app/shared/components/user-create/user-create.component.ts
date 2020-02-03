import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { UserModel, USER_EVENTS, UserFactory } from '@core/models/user';
import { UserCreateService } from './services/user-create.service';


@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCreateComponent implements OnDestroy {
  user: UserModel;

  constructor(private userCreateSrv: UserCreateService) {}


  ngOnDestroy() {
    if (this.user) this.user.destroy();
  }


  createUser() {
    console.log('User logged in: ' + this.userCreateSrv.userIsLoggedIn());

    if (this.user) this.user.destroy();
    this.user = this.userCreateSrv.createUser();
    this.user.address.updateStreet('1 Old McDonald farm road',
      '[UserCreationComponent] updateStreet');

    this.user.events.on(USER_EVENTS.DATA_CHANGED, (data) => {
      console.log('USER_EVENTS.DATA_CHANGED', data);
    });

    this.user.events.on(USER_EVENTS.DESTROYED, () => {
      console.log('USER_EVENTS.DESTROYED');
    });
  }


  onNameChanged(name: string) {
    console.log('onNameChanged...');
    if (!this.user) return;
    this.user.updateName(name);
  }

}


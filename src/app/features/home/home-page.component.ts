import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GlobalEventsService, GLOBAL_EVENTS } from '@core/services';
import { EventListener } from '@thenja/event-manager';
import { AuthService, AUTH_EVENTS } from '@core/services';
import { IEmittedEventData } from '@core/interfaces';
import * as Rx from 'rxjs';
import { environment } from 'src/environments/environment';
import { MathsModel } from '@core/models/maths';
import {
  UserCreateFacade,
  USER_CREATE_EVENTS
} from '@shared/components/user-create';
import { UserModel } from '@core/models/user';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent implements OnDestroy, OnInit {
  userLogoutState = '';
  authLogoutSubscription: Rx.Subscription;
  user: UserModel;

  constructor(public authSrv: AuthService,
  private changeRef: ChangeDetectorRef,
  public userCreateFacade: UserCreateFacade,
  public globalEventsSrv: GlobalEventsService,
  ) {
    // if you use BehaviorSubject's as a way to communicate, you can
    // subscribe like this. Make sure you unsubscribe
    this.authLogoutSubscription = this.authSrv.userLogout$.subscribe((data) => {

    });

    // access our enviroment config
    console.log('Base api url is: ' + environment.config.api.base);

    // use models that use composition, not inheritance

    // this.globalEventsSrv.events.on(GLOBAL_EVENTS.USER_LOGOUT, () => {
    //   console.log('asdkf jk;adjf;lajdf ;klajfd ;a');
    // });

    const maths = new MathsModel();
    maths.add(1, 2);
  }

  ngOnInit() {}


  ngOnDestroy() {
    if (this.authLogoutSubscription) this.authLogoutSubscription.unsubscribe();
  }

  @EventListener(GLOBAL_EVENTS.USER_LOGOUT, GlobalEventsService)
  userLogout(data: IEmittedEventData) {
    this.userLogoutState = 'User clicked logout from: ' + data.src;
    this.changeRef.detectChanges();
  }

  // We can listen to logout events on the auth service like this
  // The advantage of this is we do not have to subscribe and unsubscribe, this
  // is handled automatically by the decorator
  @EventListener(AUTH_EVENTS.LOGOUT, AuthService)
  authLogout(data: IEmittedEventData) {

  }


  @EventListener(USER_CREATE_EVENTS.CREATED, UserCreateFacade)
  userCreated(user: UserModel) {
    this.user = user;
  }
}

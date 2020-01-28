import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { UserModel } from '@core/models/user';
import { UserCreateService, USER_CREATE_EVENTS } from '../../services';
import { EventListener } from '@thenja/event-manager';


/**
 * Change the address of a user.
 *
 * This component illustrates one way of editing a users data. It's probably
 * not the best way to do things, the change-name component could be a better
 * choice. This component now has a dependency on the user service and model.
 *
 * @export
 * @class ChangeAddressComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'app-user-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeAddressComponent implements OnInit, OnDestroy {
  user: UserModel;


  /**
   * Creates an instance of ChangeAddressComponent.
   *
   * @param {UserCreateService} userCreateSrv
   * @param {ChangeDetectorRef} changeRef
   * @memberof ChangeAddressComponent
   */
  constructor(private userCreateSrv: UserCreateService,
  private changeRef: ChangeDetectorRef) {
    this.user = this.userCreateSrv.getCurrentUser();
  }

  ngOnInit() {}
  ngOnDestroy() {}


  /**
   * Fired when a user is created
   *
   * @param {UserModel} user
   * @memberof ChangeAddressComponent
   */
  @EventListener(USER_CREATE_EVENTS.CREATED, UserCreateService)
  userCreated(user: UserModel) {
    this.user = user;
    this.changeRef.markForCheck();
  }
}



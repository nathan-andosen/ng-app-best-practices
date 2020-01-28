import { Injectable } from '@angular/core';
import { UserCreateModule } from './user-create.module';
import { UserCreateService } from './services/user-create.service';
import { UserModel } from '@core/models/user';

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
export class UserCreateFacade {
  /**
   * Creates an instance of UserCreateFacade.
   *
   * @param {UserCreateService} userCreateSrv
   * @memberof UserCreateFacade
   */
  constructor(private userCreateSrv: UserCreateService) {}


  /**
   * Get the current user that was created.
   *
   * @returns {UserModel}
   * @memberof UserCreateFacade
   */
  getCurrentUser(): UserModel {
    return this.userCreateSrv.getCurrentUser();
  }
}

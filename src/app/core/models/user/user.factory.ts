import { Injectable } from '@angular/core';
import { UserModel } from './user.model';
import { IUserData } from './user.interfaces';
import { AuthService } from '@core/services';


@Injectable({
  providedIn: 'root'
})
export class UserFactory {

  constructor(private authSrv: AuthService) {}

  create(userData?: IUserData) {
    return new UserModel(this.authSrv, userData);
  }
}

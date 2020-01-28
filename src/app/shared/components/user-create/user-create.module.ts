
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UIModule } from '../ui';
import { UserCreateComponent } from './user-create.component';
import { ChangeAddressComponent } from './components/change-address';
import { ChangeNameComponent } from './components/change-name';
import { UserCreateService } from './services';

@NgModule({
  declarations: [
    UserCreateComponent,
    ChangeAddressComponent,
    ChangeNameComponent
  ],
  imports: [
    CommonModule,
    UIModule,
    FormsModule
  ],
  exports: [
    UserCreateComponent
  ],
  providers: [
    UserCreateService
  ]
})
export class UserCreateModule {}


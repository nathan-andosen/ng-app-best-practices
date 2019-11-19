import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersPageComponent } from './users-page.component';
import { SettingsPageComponent } from './settings-page';
import { AddressPageComponent, AddressFormComponent } from './address-page';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    UsersPageComponent,
    SettingsPageComponent,
    AddressPageComponent,
    AddressFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersPageComponent,
        children: [
          {
            path: 'settings',
            component: SettingsPageComponent
          },
          {
            path: 'address',
            component: AddressPageComponent
          }
        ]
      }
    ])
  ]
})
export class UsersModule {}

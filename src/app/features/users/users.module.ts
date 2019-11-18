import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UsersPageComponent } from './users-page.component';
import { SettingsPageComponent } from './settings-page';

@NgModule({
  declarations: [
    UsersPageComponent,
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersPageComponent
      },
      {
        path: '/settings',
        component: SettingsPageComponent
      }
    ])
  ]
})
export class UsersModule {}

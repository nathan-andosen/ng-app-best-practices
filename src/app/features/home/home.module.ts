
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';

import { SharedModule } from '@shared/shared.module';
// import { PageWrapComponent } from  '@core/components/page-wrap';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePageComponent
      }
    ])
  ]
})
export class HomeModule {}


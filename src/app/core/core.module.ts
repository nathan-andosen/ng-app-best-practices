import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AppRoutingModule } from '@core/routing/app-routing.module';

import { HeaderComponent } from './components/header';
import { SharedModule } from '@shared/shared.module';
import { PageWrapComponent } from './components/page-wrap';


import { HomePageComponent } from '@features/home';
import { UserCreationComponent } from '@features/home/components/user-creation';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    PageWrapComponent,
    // HomePageComponent,
    // UserCreationComponent
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    HeaderComponent,
    PageWrapComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only '
        + 'import Core modules in the AppModule only.');
    }
  }
}

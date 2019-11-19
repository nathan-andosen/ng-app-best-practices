import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AppRoutingModule } from '@core/routing/app-routing.module';

import { HeaderComponent } from './components/header';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports: [
    CommonModule,
    AppRoutingModule,
    HeaderComponent
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

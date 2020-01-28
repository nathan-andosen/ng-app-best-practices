import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/ui/button';
import { FormsModule } from '@angular/forms';
import { LargeSizeComponent } from './components/large-size';

import { UIModule } from './components/ui';
import { UserCreateModule } from './components/user-create';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserCreateModule,
    UIModule
  ],
  declarations: [
    LargeSizeComponent
  ],
  entryComponents: [

  ],
  exports: [
    LargeSizeComponent,
    FormsModule,
    UserCreateModule,
    UIModule
  ]
})
export class SharedModule {

}

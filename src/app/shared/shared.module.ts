import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/ui/button';
import { LargeSizeComponent } from './components/large-size';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent,
    LargeSizeComponent
  ],
  entryComponents: [

  ],
  exports: [
    ButtonComponent,
    LargeSizeComponent
  ]
})
export class SharedModule {

}

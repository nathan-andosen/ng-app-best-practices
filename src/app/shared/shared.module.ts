import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/ui/button';
import { FormsModule } from '@angular/forms';
import { LargeSizeComponent } from './components/large-size';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ButtonComponent,
    LargeSizeComponent
  ],
  entryComponents: [

  ],
  exports: [
    ButtonComponent,
    LargeSizeComponent,
    FormsModule
  ]
})
export class SharedModule {

}

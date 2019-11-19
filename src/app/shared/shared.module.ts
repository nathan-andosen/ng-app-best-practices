import { NgModule } from '@angular/core';

import { ButtonComponent } from './components/ui/button';
import { LargeSizeComponent } from './components/large-size';

@NgModule({
  imports: [

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

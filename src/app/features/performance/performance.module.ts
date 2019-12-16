
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PerformancePageComponent } from './performance-page.component';

import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    PerformancePageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: PerformancePageComponent
      }
    ])
  ]
})
export class PerformanceModule {}


import { Component, OnDestroy, AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { GlobalEventsService, GLOBAL_EVENTS } from '@core/services';
import { EventListener } from '@thenja/event-manager';
import { AuthService, AUTH_EVENTS } from '@core/services';
import { IEmittedEventData } from '@core/interfaces';
import * as Rx from 'rxjs';
import { environment } from 'src/environments/environment';
import { MathsModel } from '@core/models/maths';
import { UserModel } from '@core/models/user';


@Component({
  selector: 'app-performance-page',
  templateUrl: './performance-page.component.html',
  styleUrls: ['./performance-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformancePageComponent implements AfterViewInit {
  btns: string[] = [];


  constructor(private cdr: ChangeDetectorRef) {
    const btns = [];
    for (let i = 0; i < 1000; i++) {
      btns.push('Button ' + i);
    }
    this.btns = btns;

    window['startTime'] = new Date().getTime();

    

  }


  ngAfterViewInit() {
    const endTime = new Date().getTime();

    console.log('Time: ' + (endTime - window['startTime']) + 'ms');

    // this.cdr.detectChanges();
  }
  

  trackByFunc(index, obj) {
    return obj;
  }

}

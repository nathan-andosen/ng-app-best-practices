import { Component } from '@angular/core';
import { GlobalEventsService, GLOBAL_EVENTS } from '@core/services';
import { IEmittedEventData } from '@core/interfaces';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private globalEventsSrv: GlobalEventsService) {}


  logout() {
    const eventData: IEmittedEventData = {
      src: 'HeaderComponent',
      someData: true
    };
    this.globalEventsSrv.events.emit(GLOBAL_EVENTS.USER_LOGOUT, eventData);
  }
}

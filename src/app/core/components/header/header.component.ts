import { Component } from '@angular/core';
import { GlobalEventsService, GLOBAL_EVENTS, IEventData } from '@core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private globalEventsSrv: GlobalEventsService) {}


  logout() {
    const eventData: IEventData = {
      src: 'HeaderComponent',
      someData: true
    };
    this.globalEventsSrv.emit(GLOBAL_EVENTS.USER_LOGOUT, eventData);
  }
}

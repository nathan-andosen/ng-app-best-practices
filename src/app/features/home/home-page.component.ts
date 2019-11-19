import { Component } from '@angular/core';
import { GlobalEventsService, GLOBAL_EVENTS, IEventData } from '@core/services';
import { EventListener } from '@thenja/event-manager';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  userLogoutState = '';

  constructor(protected globalEventsSrv: GlobalEventsService) {}


  @EventListener(GLOBAL_EVENTS.USER_LOGOUT, GlobalEventsService.name)
  userLogout(data: IEventData) {
    this.userLogoutState = 'User clicked logout from: ' + data.src;
  }

}

import { Injectable } from '@angular/core';
import { EventManager } from '@thenja/event-manager';
import * as Rx from 'rxjs';

export const AUTH_EVENTS = {
  LOGOUT: 'logout'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // you could use the EventManager to manage all events from the Auth Service
  events = new EventManager();
  // or
  // use a RxJs Subject, which only relates to one event
  userLogout$: Rx.BehaviorSubject<void>;


  fireLogoutEvent() {
    this.events.emit(AUTH_EVENTS.LOGOUT);
    // or
    this.userLogout$.next(null);
  }

}

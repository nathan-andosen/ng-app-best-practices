import { Injectable } from '@angular/core';
import { EventManager } from '@thenja/event-manager';
import * as Rx from 'rxjs';
import { IEmittedEventData } from '@core/interfaces';

export const AUTH_EVENTS = {
  LOGOUT: 'logout'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // you could use the EventManager to manage all events from the Auth Service
  events = new EventManager(AUTH_EVENTS);
  // or
  // use a RxJs Subject, which only relates to one event
  userLogout$: Rx.BehaviorSubject<IEmittedEventData>;


  constructor() {
    this.userLogout$ = new Rx.BehaviorSubject(null);
  }


  fireLogoutEvent() {
    const data: IEmittedEventData = {
      src: 'AuthService'
    };
    this.events.emit(AUTH_EVENTS.LOGOUT, data);
    // or
    this.userLogout$.next(data);
  }

}

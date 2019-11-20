import { Injectable } from '@angular/core';
import { EventManager } from '@thenja/event-manager';

export const GLOBAL_EVENTS = {
  USER_LOGOUT: 'user-logout'
};

@Injectable({
  providedIn: 'root'
})
export class GlobalEventsService extends EventManager {

}

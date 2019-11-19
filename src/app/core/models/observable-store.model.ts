
import {Observable, BehaviorSubject} from 'rxjs';

// When changing the state for an entity, it is referred to as an action
export interface IActionHistory {
  action: string;
  previousState: any;
  nowState: any;
}

/**
 * Observable Store.
 *
 * Inspired by: https://github.com/DanWahlin/Observable-Store
 *
 * Only works with json objects. (Could easily be updated to work with other
 * state types)
 *
 * Used to store state for an entity. Uses observables for reactive programming
 * and keeps a limited history of updates / changes to the state.
 */
export class ObservableStore<T> {
  private historyCount = 50;
  private actionHistory: IActionHistory[] = [];

  // Our entities state as an observable.
  // Other intrested entities can subscribe to state updates via this observable
  state$: Observable<T>;

  // Our RxJs BehaviorSubject. No one should have access to this.
  private stateSubject$: BehaviorSubject<T>;


  /**
   * Constructor
   */
  constructor(initialeState?: T) {
    this.stateSubject$ = new BehaviorSubject(initialeState);
    this.state$ = this.stateSubject$.asObservable();
  }


  /**
   * Return a snapshot of the tracking history
   */
  getActionHistory(): IActionHistory[] {
    return this.actionHistory;
  }


  /**
   * Return a snapshot of our state
   */
  get state(): T {
    return this.stateSubject$.getValue();
  }


  /**
   * Push new state into the state stream
   */
  setState(nextState: T, action?: string): void {
    this.addHistory((action || 'not-set'), this.state, nextState);
    this.stateSubject$.next(nextState);
  }


  /**
   * Patch the existing state with new properties
   */
  patchState(patchState: Partial<T>, action?: string): void {
    const newData = { ...this.state, ...patchState };
    this.setState(newData, action);
  }


  /**
   * Add tracking history
   */
  private addHistory(action: string, previousState: any, nowState: any) {
    if (this.actionHistory.length > this.historyCount) {
      this.actionHistory.shift();
    }
    this.actionHistory.push({
      action,
      previousState,
      nowState
    });
  }
}

import { BehaviorSubject, Observable } from 'rxjs';

// When changing the state for an entity, it is referred to as an action
export interface IActionHistory {
  action: string;
  previousState: any;
  nowState: any;
}

export interface IObservableStoreOptions {
  maxHistoryCount: number;
}


/**
 * Observable Store.
 *
 * Inspired by: https://github.com/DanWahlin/Observable-Store
 *
 * Only works with json objects. (Could easily be updated for other state types)
 *
 * Used to store state for an entity. Uses observables for reactive programming
 * and keeps a limited history of updates / changes to the state.
 */
export class ObservableStore<T> {
  private options: IObservableStoreOptions = { maxHistoryCount: 50 };
  private _actionHistory: IActionHistory[] = [];

  // Our entities state as an observable.
  // Other intrested entities can subscribe to state updates via this observable
  readonly state$: Observable<T>;

  // Our RxJs BehaviorSubject. No one should have access to this.
  private _state$: BehaviorSubject<T>;

  // Return a snapshot of our state
  get state(): T {
    return this._state$.getValue();
  }

  /**
   * Constructor
   */
  constructor(initialeState?: T, options?: IObservableStoreOptions) {
    this._state$ = new BehaviorSubject(initialeState);
    this.state$ = this._state$.asObservable();

    if (options) {
      this.options = { ...this.options as any, ...options as any };
    }
  }

  /**
   * Return a snapshot of the tracking history
   */
  actionHistory(): IActionHistory[] {
    return this._actionHistory;
  }


  /**
   * Return a snapshot of our state
   */
  getState(): T {
    return this._state$.getValue();
  }


  /**
   * Push new state into the state stream
   */
  setState(nextState: T, action?: string): void {
    this.addHistory((action || 'not-set'), this._state$, nextState);
    this._state$.next(nextState);
  }


  /**
   * Patch the existing state with new properties
   */
  patchState(patchState: Partial<T>, action?: string): void {
    const newData = this.deepCloneAndPatch(this.state, patchState);
    this.setState(newData, action);
  }


  /**
   * Add tracking history
   */
  private addHistory(action: string, previousState: any, nowState: any) {
    if (this._actionHistory.length > this.options.maxHistoryCount) {
      this._actionHistory.shift();
    }

    this._actionHistory.push({
      action,
      previousState,
      nowState
    });
  }


  /**
   * Deep clone a json object and patch it with another json object
   *
   * @private
   * @param {*} obj1
   * @param {*} patch
   * @returns {*}
   * @memberof ObservableStore
   */
  private deepCloneAndPatch(obj1: any, patch: any): any {
    if (!patch) return obj1;
    const obj = JSON.parse(JSON.stringify(obj1));
    this.mergeRecusive(obj, patch);
    return obj;
  }


  /**
   * Merge one json object with another (deep merge)
   *
   * @private
   * @param {*} obj1
   * @param {*} patch
   * @memberof ObservableStore
   */
  private mergeRecusive(obj1: any, patch: any) {
    for (const key in patch) {
      if (patch.hasOwnProperty(key)) {
        if (typeof obj1[key] === 'undefined'
        || patch[key].constructor !== {}.constructor) {
          obj1[key] = patch[key];
        } else {
          this.mergeRecusive(obj1[key], patch[key]);
        }
      }
    }
  }
}

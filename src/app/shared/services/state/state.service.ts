import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService<T> {
  private stateSubject: BehaviorSubject<T[]>;
  state$: Observable<T[]>;

  constructor() {
    this.stateSubject = new BehaviorSubject<T[]>([]);
    this.state$ = this.stateSubject.asObservable();
  }

  initializeState(initialState: T[]): void {
    this.stateSubject.next(initialState);
  }

  getState(): T[] {
    return this.stateSubject.getValue();
  }

  setState(newState: T[]): void {
    this.stateSubject.next(newState);
  }
}

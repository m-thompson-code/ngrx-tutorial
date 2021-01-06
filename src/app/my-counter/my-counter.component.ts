import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { increment, decrement, reset } from '../counter.actions';

@Component({
  selector: 'moo-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.scss']
})
export class MyCounterComponent implements OnDestroy {
  count$: Observable<number>

  // Adding using a subscription just to see how that looks
  count: number = 0;
  private _sub?: Subscription;
 
  // Inject the store into MyCounterComponent
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');

    // Adding using a subscription just to see how that looks
    this._sub = this.count$.subscribe(count => {
      this.count = count;
    });
  }

  // Implement the increment, decrement, and reset methods by dispatching actions to the store.
 
  increment() {
    // Dispatch an increment action
    this.store.dispatch(increment());
  }
 
  decrement() {
    // Dispatch a decrement action
    this.store.dispatch(decrement());
  }
 
  reset() {
    // Dispatch a reset action
    this.store.dispatch(reset());
  }

  ngOnDestroy(): void {
    this._sub?.unsubscribe();
  }
}

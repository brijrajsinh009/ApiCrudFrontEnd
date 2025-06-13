import { createSelector } from '@ngrx/store';

export interface AppState {
  counter: number;
}

export const selectCounter = (state: AppState) => state.counter;

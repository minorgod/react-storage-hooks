/* eslint-disable react-hooks/rules-of-hooks */

import { Dispatch } from 'react';
import { expectType, expectError } from 'tsd';

import { useStorageReducer } from '..';
import { storageLikeObject } from './utils';

type State = { value: number };
type Action = { type: 'inc' | 'dec' };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'inc':
      return { value: state.value + 1 };
    case 'dec':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

const [state, dispatch, writeError] = useStorageReducer(
  localStorage,
  'key',
  reducer,
  { value: 0 }
);
expectType<State>(state);
expectType<Dispatch<Action>>(dispatch);
expectType<Error | undefined>(writeError);
// @ts-expect-error
expectError(() => dispatch({ type: 'other' }));

const [otherState, otherDispatch] = useStorageReducer(
  localStorage,
  'key',
  reducer,
  0,
  (value) => ({ value })
);
expectType<State>(otherState);
expectType<Dispatch<Action>>(otherDispatch);

useStorageReducer(storageLikeObject, 'key', reducer, { value: 0 });

// @ts-expect-error
expectError(() => useStorageReducer());
// @ts-expect-error
expectError(() => useStorageReducer(localStorage));
// @ts-expect-error
expectError(() => useStorageReducer(localStorage, 'key'));
// @ts-expect-error
expectError(() => useStorageReducer(localStorage, 'key', reducer));
// @ts-expect-error
expectError(() => useStorageReducer({}, 'key', reducer, { value: 0 }));
// @ts-expect-error
expectError(() => useStorageReducer(localStorage, 0, reducer, { value: 0 }));

expectError(() =>
  // @ts-expect-error
  useStorageReducer(localStorage, 'key', () => 0, { value: 0 })
);
expectError(() =>
  // @ts-expect-error
  useStorageReducer(localStorage, 'key', reducer, { value: 'value' })
);
expectError(() =>
  // @ts-expect-error
  useStorageReducer(localStorage, 'key', reducer, 'value', (value) => ({ value }))
);

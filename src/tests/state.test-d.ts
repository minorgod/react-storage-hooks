/* eslint-disable react-hooks/rules-of-hooks */

import { Dispatch, SetStateAction } from 'react';
import { expectType, expectError } from 'tsd';

import { useStorageState } from '..';
import { storageLikeObject } from './utils';

type SetState<S> = Dispatch<SetStateAction<S>>;

const [inferredString, setInferredString, writeError] = useStorageState(
  localStorage,
  'key',
  'test'
);
expectType<string>(inferredString);
expectType<SetState<string>>(setInferredString);
expectType<Error | undefined>(writeError);
// @ts-expect-error
expectError(() => setInferredString(0));

const [inferredNumber, setInferredNumber] = useStorageState(
  localStorage,
  'key',
  0
);
expectType<number>(inferredNumber);
expectType<SetState<number>>(setInferredNumber);
// @ts-expect-error
expectError(() => setInferredNumber('test'));

const [inferredNumberLazy, setInferredNumberLazy] = useStorageState(
  localStorage,
  'key',
  () => 0
);
expectType<number>(inferredNumberLazy);
expectType<SetState<number>>(setInferredNumberLazy);
// @ts-expect-error
expectError(() => setInferredNumberLazy('test'));

const [declaredNumber, setDeclaredNumber] = useStorageState<number>(
  localStorage,
  'key'
);
expectType<number | null>(declaredNumber);
expectType<SetState<number | null>>(setDeclaredNumber);
// @ts-expect-error
expectError(() => setDeclaredNumber('test'));

const [unknown, setUnknown] = useStorageState(localStorage, 'key');
expectType<unknown>(unknown);
expectType<SetState<unknown>>(setUnknown);

useStorageState(storageLikeObject, 'key', 0);
// @ts-expect-error
expectError(() => useStorageState());
// @ts-expect-error
expectError(() => useStorageState(localStorage));
// @ts-expect-error
expectError(() => useStorageState({}, 'key'));
// @ts-expect-error
expectError(() => useStorageState(localStorage, 0));

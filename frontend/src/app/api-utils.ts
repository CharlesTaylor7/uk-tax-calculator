import {
  catchError,
  map,
  Observable,
  of,
  OperatorFunction,
  startWith,
} from 'rxjs';

export function withApiState<T>(): OperatorFunction<T, ApiData<T>> {
  return (source$: Observable<T>) =>
    source$.pipe(
      map((data: T) => ({ loading: false, error: null, data })),
      startWith({ loading: true, error: null, data: null }),
      catchError((err) => of({ loading: false, error: err, data: null })),
    );
}
export interface ApiData<T> {
  error: string | null;
  loading: boolean;
  data: T | null;
}

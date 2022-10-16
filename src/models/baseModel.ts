export interface BaseApiResult<T> {
  code: number;
  message: string;
  data: T;
}

export interface BaseApiResult<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
}

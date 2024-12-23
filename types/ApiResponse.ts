export interface ApiResponse<T> {
  data: T | any;
  message: string;
  statusCode: number;
  errors: any;
}

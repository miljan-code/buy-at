type SuccessResponse<T> = {
  status: 'success';
  data: T;
};

type FailResponse = {
  status: 'fail';
  message: string;
};

export type APIResponse<T> = SuccessResponse<T> | FailResponse;

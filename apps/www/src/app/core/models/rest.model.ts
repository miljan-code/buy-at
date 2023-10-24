type ErrorName = 'wrongEmail' | 'wrongPassword';

type SuccessResponse<T> = {
  status: 'success';
  data: T;
};

type FailResponse = {
  status: 'fail';
  data: {
    errorName: ErrorName;
    message: string;
  };
};

export type APIResponse<T> = SuccessResponse<T> | FailResponse;

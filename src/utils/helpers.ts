import { HttpException } from '@nestjs/common';

interface IMetaResponse {
  data: any;
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
  };
}
export const getMetaResponse = (result: IMetaResponse) => {
  return {
    data: result.data,
    meta: {
      itemsPerPage: result.meta.itemsPerPage,
      totalItems: result.meta.totalItems,
      currentPage: result.meta.currentPage,
      totalPages: result.meta.totalPages,
    },
  };
};

const errorCode = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  500: 'INTERNAL_SERVER_ERROR',
};

export const responseMaker = (httpCode = 200, data = {}, message = 'OK') => {
  if (httpCode >= 400) {
    const code = errorCode[httpCode] ?? 'INTERNAL_SERVER_ERROR';
    throw new HttpException(code, httpCode);
  }

  return {
    message,
    data,
  };
};

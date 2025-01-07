export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code?: string
  ) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}

interface ErrorResponse {
  message: string;
  code?: string;
  stack?: string;
}

export const handleError = (err: Error | AppError) => {
  if (err instanceof AppError) {
    const response: ErrorResponse = {
      message: err.message,
    };

    if (err.code) {
      response.code = err.code;
    }

    // Solo incluir stack trace en desarrollo
    if (process.env.NODE_ENV === 'development') {
      response.stack = err.stack;
    }

    return {
      statusCode: err.statusCode,
      body: response,
    };
  }

  // Error no controlado
  const response: ErrorResponse = {
    message: 'Internal server error',
  };

  if (process.env.NODE_ENV === 'development') {
    response.message = err.message;
    response.stack = err.stack;
  }

  return {
    statusCode: 500,
    body: response,
  };
};

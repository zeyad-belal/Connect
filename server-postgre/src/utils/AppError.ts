export default class AppError extends Error {
  statusCode: number;
  errors: any;

  constructor(message: string, statusCode?: number, errors?: any) {
    super(message);
    this.statusCode = statusCode || 500;
    this.errors = errors;
  }
}


export interface CustomError extends Error {
  statusCode?: number;
  errors?: any[];
}
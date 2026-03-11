import { HttpError } from './HttpError';

export class UnauthorizedError extends HttpError {
  constructor(message = 'Não autorizado') {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

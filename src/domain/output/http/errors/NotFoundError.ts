import { HttpError } from "./HttpError";

export class NotFoundError extends HttpError {
  constructor(message = "Não encontrado") {
    super(404, message)
  }
}
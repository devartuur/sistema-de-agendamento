import { UseCaseError } from "../use-case-error";

export class ForbiddenError extends Error implements UseCaseError {
  constructor(message = 'You are not allowed to do this') {
    super(message)
  }
}

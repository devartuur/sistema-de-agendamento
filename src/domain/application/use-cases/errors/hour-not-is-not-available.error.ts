import { UseCaseError } from "src/core/errors/use-case-error";

export class HourIsNotAvailableError implements UseCaseError {
  message: string;
  constructor() {
    this.message = 'This hour is not available'
  }
}
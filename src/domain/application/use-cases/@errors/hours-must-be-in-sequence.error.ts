import { UseCaseError } from "src/core/errors/use-case-error";

export class HourMustBeInSequenceError implements UseCaseError {
  message: string;
  constructor() {
    this.message = 'Hours must be in sequence'
  }
}
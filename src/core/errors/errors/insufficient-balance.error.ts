export class InsufficientBalanceError extends Error {
  constructor() {
    super('Insufficient balance to perform this operation.')
    this.name = 'InsufficientBalanceError'
  }
}



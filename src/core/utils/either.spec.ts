import { Either, left, right } from './either'

function doSomething(x?: boolean): Either<string, number> {
  if (x) {
    return right(1)
  }

  return left('error')
}

describe('Either', () => {
  it('success result', () => {
    const successResult = doSomething(true)

    expect(successResult.isRight()).toBe(true)
  })

  it('error result', () => {
    const errorResult = doSomething()

    expect(errorResult.isLeft()).toBe(true)
  })
})

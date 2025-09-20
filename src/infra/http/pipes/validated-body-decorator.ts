import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { ZodSchema } from 'zod'
import { ZodValidationPipe } from './zod-validation-pipe'

export const ValidatedBody = (schema: ZodSchema) => {
  return createParamDecorator((_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const body = request.body

    const pipe = new ZodValidationPipe(schema)
    return pipe.transform(body)
  })()
}

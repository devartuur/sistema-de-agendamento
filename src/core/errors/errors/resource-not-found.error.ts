import { UseCaseError } from '@/core/errors/use-case-error'

type ResourceType = 'User' | 'Version' | 'Photo' | 'Prompt' | 'UserPhoto'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(resource?: ResourceType) {
    super(`Resource not found: ${resource}`)
  }
}

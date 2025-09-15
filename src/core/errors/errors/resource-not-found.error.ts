import {UseCaseError} from '../use-case-error'


type ResourceType = 'Customer' | 'Collaborator' | 'Service' | 'Hour'

export class ResourceNotFoundError extends Error implements UseCaseError {
  constructor(resource?: ResourceType) {
    super(`Resource not found: ${resource}`)
  }
}

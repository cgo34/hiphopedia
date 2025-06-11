import { ApplicationError } from './ApplicationError'

export class RepositoryError extends ApplicationError {
  constructor(code: string, message: string, details?: unknown) {
    super(`REPOSITORY_${code}`, message, details)
  }
}
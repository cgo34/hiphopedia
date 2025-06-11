import { ApplicationError } from '@/core/domain/errors/ApplicationError'

export class DatabaseError extends ApplicationError {
  constructor(code: string, message: string, details?: unknown) {
    super(`DATABASE_${code}`, message, details)
  }
}
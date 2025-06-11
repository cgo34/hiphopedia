export class ApplicationError extends Error {
    constructor(
      public code: string,
      message: string,
      public details?: unknown
    ) {
      super(message)
      this.name = this.constructor.name
    }
  }
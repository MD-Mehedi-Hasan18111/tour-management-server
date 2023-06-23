import { ZodError } from 'zod'
import { IGenericError } from '../interfaces/error'
import { IValidationError } from '../interfaces/common'

const handleZodErrorHandler = (error: ZodError): IValidationError => {
  const errors: IGenericError[] = error.issues.map(issue => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    }
  })

  const statusCode = 400
  return {
    statusCode,
    message: error.message,
    errorMessages: errors,
  }
}

export default handleZodErrorHandler

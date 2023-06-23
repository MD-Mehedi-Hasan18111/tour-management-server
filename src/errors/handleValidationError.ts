import mongoose from 'mongoose'
import { IGenericError } from '../interfaces/error'
import { IValidationError } from '../interfaces/common'

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IValidationError => {
  const errors: IGenericError[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}

export default handleValidationError

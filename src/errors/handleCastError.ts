import mongoose from 'mongoose'
import { IGenericError } from '../interfaces/error'

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericError[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ]

  const statusCode = 400
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  }
}

export default handleCastError

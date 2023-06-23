import { IGenericError } from './error'

export type IValidationError = {
  statusCode: number
  message: string
  errorMessages: IGenericError[]
}

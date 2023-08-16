import { Router } from 'express'
import validator from 'express-joi-validation'
import { AuthValidator } from '../validators/AuthValidator'
import { AuthController } from '../controllers/AuthController'

const AuthSchemaValidator = validator.createValidator({ passError: true })

const AuthRoutes = Router()

AuthRoutes.post('/', AuthSchemaValidator.body(AuthValidator), AuthController.store)

export { AuthRoutes }
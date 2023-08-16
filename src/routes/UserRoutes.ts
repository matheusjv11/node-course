import { Router } from 'express'
import validator from 'express-joi-validation'
import { UserValidator } from '../validators/UserValidator'
import { UserController } from '../controllers/UserController'

const UserSchemaValidator = validator.createValidator({ passError: true })

const UserRoutes = Router()

UserRoutes.post('/', UserSchemaValidator.body(UserValidator), UserController.store)

export { UserRoutes }
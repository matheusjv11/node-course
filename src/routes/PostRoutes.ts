import { Router } from 'express'
import { PostController } from '../controllers/PostController'
import validator from 'express-joi-validation'
import { PostValidator } from '../validators/PostValidator'

const PostSchemaValidator = validator.createValidator({ passError: true })

const PostRoutes = Router()

PostRoutes.get('/', PostController.index)
PostRoutes.get('/:postId', PostController.show)
PostRoutes.post('/', PostSchemaValidator.body(PostValidator), PostController.store)
PostRoutes.put('/:postId', PostSchemaValidator.body(PostValidator), PostController.update)
PostRoutes.delete('/:postId', PostController.delete)

export { PostRoutes }
import Joi from 'joi'
import { PostType } from '../types/PostType'

export const PostValidator = Joi.object<PostType>({
    titulo: Joi.string().max(120).required(),
    texto: Joi.string().max(500).required()
})
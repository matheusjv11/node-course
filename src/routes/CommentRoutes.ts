import { Router } from "express";
import { CommentController } from "../controllers/CommentController";
import validator from "express-joi-validation";
import { CommentValidator } from "../validators/CommentValidator";

const CommentSchemaValidator = validator.createValidator({ passError: true });

const CommentRoutes = Router();

CommentRoutes.post(
  "/toPost/:postId",
  CommentSchemaValidator.body(CommentValidator),
  CommentController.store
);
CommentRoutes.patch(
  "/like/:commentId",
  CommentSchemaValidator.body(CommentValidator),
  CommentController.like
);

export { CommentRoutes };

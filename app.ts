import express, { Express } from "express";
import { connectToMongoose } from "./src/config/mongoose";
import { AuthMiddleware } from "./src/middlewares/AuthMiddleware";
import { AuthRoutes } from "./src/routes/AuthRoutes";
import { CommentRoutes } from "./src/routes/CommentRoutes";
import { PostRoutes } from "./src/routes/PostRoutes";
import { UserRoutes } from "./src/routes/UserRoutes";

const app: Express = express();

connectToMongoose();

app.use(express.json());

app.use("/auth", AuthRoutes);

app.use(AuthMiddleware);

app.use("/users", UserRoutes);
app.use("/posts", PostRoutes);
app.use("/comments", CommentRoutes);

// @ts-ignore
app.use((err, req, res, next) => {
  if (err && err.error && err.error.isJoi) {
    res.status(400).json({
      tipo: err.type,
      mensagem: err.error.toString(),
    });
  } else {
    next(err);
  }
});

app.listen("3001");

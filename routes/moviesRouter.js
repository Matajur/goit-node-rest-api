import express from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import isEmptyBody from "../middlewares/isEmptyBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "..//middlewares/upload.js";

import {
  getAllMovies,
  getOneMovie,
  deleteMovie,
  createMovie,
  updateMovie,
  updateStatusMovie,
} from "../controllers/moviesControllers.js";

import {
  createMovieSchema,
  updateMovieSchema,
} from "../schemas/moviesSchemas.js";

const moviesRouter = express.Router();

moviesRouter.use(authenticate);

moviesRouter.get("/", ctrlWrapper(getAllMovies));

moviesRouter.get("/:id", ctrlWrapper(getOneMovie));

moviesRouter.delete("/:id", ctrlWrapper(deleteMovie));

// upload.files([{name: "poster", maxCount: 3}, {name: "avatar", maxCount: 1}])
// upload.array("poster", 5)
moviesRouter.post(
  "/",
  upload.single("poster"),
  isEmptyBody,
  validateBody(createMovieSchema),
  ctrlWrapper(createMovie)
);

moviesRouter.put(
  "/:id",
  isEmptyBody,
  validateBody(updateMovieSchema),
  ctrlWrapper(updateMovie)
);

moviesRouter.patch(
  "/:id/favorite",
  isEmptyBody,
  validateBody(updateMovieSchema),
  ctrlWrapper(updateStatusMovie)
);

export default moviesRouter;

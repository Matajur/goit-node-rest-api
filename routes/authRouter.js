import { Router } from "express";

import ctrlWrapper from "../decorators/ctrlWrapper.js";
import validateBody from "../decorators/validateBody.js";

import { authRegisterSchema, authLoginSchema } from "../schemas/authSchemas.js";

import { register, login } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateBody(authRegisterSchema),
  ctrlWrapper(register)
);

authRouter.post("/login", validateBody(authLoginSchema), ctrlWrapper(login));

export default authRouter;

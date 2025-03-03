import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../db/models/User.js";

import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...payload, password: hashPassword });
  return newUser;
};

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });

  return { token: token, user: user };
};

import * as authServices from "../services/authServices.js";

export const register = async (req, res) => {
  const result = await authServices.registerUser(req.body);

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

export const login = async (req, res) => {
  const result = await authServices.loginUser(req.body);

  res.json({
    token: result.token,
    user: {
      email: result.user.email,
      subscription: result.user.subscription,
    },
  });
};

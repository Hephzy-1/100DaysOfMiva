import Joi from "joi";

export const userSignUp = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8),
  googleId: Joi.string()
});


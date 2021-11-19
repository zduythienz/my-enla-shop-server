const Joi = require('joi');

const registerValidation = (body) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
    email: Joi.string().required().email(),
    phone: Joi.string().required(),
  });
  return schema.validate(body, { allowUnknown: true });
};


module.exports = {
  registerValidation,
};

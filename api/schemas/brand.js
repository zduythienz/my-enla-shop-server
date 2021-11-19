const Joi = require('joi');

const createNewBrandValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
  });
  return schema.validate(body, { allowUnknown: true });
};


module.exports = {
  createNewBrandValidation,
};

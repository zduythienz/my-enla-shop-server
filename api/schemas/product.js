const Joi = require('joi');


const createNewProductValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    skus: Joi.string(),
    status: Joi.string(),
  });
  return schema.validate(body, { allowUnknown: true });
};


module.exports = {
  createNewProductValidation,
};
